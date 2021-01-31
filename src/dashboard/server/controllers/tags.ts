import { asyncHandler } from '@/middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '@/interfaces/index'
import { Request, NextFunction } from 'express'
import { TagModel } from '@/models/Tag'
import { ImageModel } from '@/models/Image'
import { imageInCatalog } from '@/utils/checks/imageInCatalog'
import { getQSetKeys } from '@/utils/getQuestionSetKeys'
import { log } from '@/utils/logger'
import { ArchiveModel } from '../models/Archive'
import { CatalogModel } from '../models/Catalog'
import { QuestionSetModel } from '../models/QuestionSet'
import fs from 'fs'
import archiver from 'archiver'
import { TagDocument } from '@/interfaces/models'
import { createObjectCsvWriter } from 'csv-writer'

//✔️
const tagImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { userId, imageId, tags } = req.body

    log({
      message: `Tagging image ${imageId} by user ${userId}`,
      type: 'info',
    })
    log({
      message: Object.keys(tags).join(', '),
    })

    //check if user has already tagged this image
    const previousTag = await TagModel.find({
      userId: userId,
      imageId: imageId,
    })
    if (previousTag.length > 0) {
      return res.status(200).json({
        success: false,
        message: `User ${userId} has already tagged image ${imageId}`,
      })
    }

    //check if the catalog of the archive of the image belongs to user
    const image = await ImageModel.findById(imageId)
    const imageInCatalogRes = await imageInCatalog(
      image,
      req.user.data.catalogs
    )

    if (!imageInCatalogRes.success) {
      return res.status(200).json({
        success: false,
        message: imageInCatalogRes.message,
      })
    }

    //check if any matching tags: DO BEFORE ADDING TAG
    // const compareResult = await image.compareTags(tags, ['Additional Comments'])
    // const finalizable = compareResult.numMatch === compareResult.numberOfMatches

    //Now we add in the keys from the overall question set

    //get archive and catalog to get question set
    const archive = await ArchiveModel.findById(image.archive)
    if (!archive) {
      log({
        message: `Archive ${image.archive} of image ${image._id} does not exist`,
        type: 'error',
      })
      return res.status(400).json({
        success: false,
        message: `Archive ${image.archive} of image ${image._id} does not exist`,
      })
    }

    const catalog = await CatalogModel.findById(archive.catalog)
    if (!catalog) {
      log({
        message: `Catalog ${archive.catalog} of archive ${archive._id} does not exist`,
        type: 'error',
      })
      return res.status(400).json({
        success: false,
        message: `Catalog ${archive.catalog} of archive ${archive._id} does not exist`,
      })
    }
    const questionSet = await QuestionSetModel.findById(catalog.questionSet)
    //get keys from question set
    const tagKeys = await getQSetKeys(questionSet?._id)

    //create default tag from keys
    const tagWithDefault = {}
    tagKeys.forEach((key) => {
      tagWithDefault[key] = 'NaN'
    })

    //add in the values from the tag
    Object.keys(tags).forEach((key) => {
      tagWithDefault[key] = tags[key] ?? 'NaN'
    })

    //create
    const newTag = await TagModel.create({
      date: Date.now(),
      imageId: imageId,
      userId: req.user.data._id,
      tags: tagWithDefault,
      //final: finalizable,
    })

    res.newTag = newTag

    //If finalized, update imageDoc to have this new tag
    // if (finalizable) {
    // log({
    // message: `Image ${imageId} is finalizable`,
    // type: 'info',
    // })
    // await ImageModel.updateOne(
    // { _id: imageId },
    // { finalTag: newTag._id, taggable: true }
    // )
    // }

    next()
  }
)

type tagExportType = {
  _id: string
  numTags: number
  tags: TagDocument[]
}

function exportTest(userOnly = true) {
  return asyncHandler(async (req: Request, res: ExtenedResponse) => {
    const query = userOnly ? { userId: req.user.data._id } : {}

    //get tags and group by catalog ID
    const tagsToExport: tagExportType[] = await TagModel.aggregate([
      {
        $match: query,
      },
      //reverse pop archive
      {
        $lookup: {
          from: ArchiveModel.collection.name,
          localField: 'archiveId',
          foreignField: '_id',
          as: 'archive',
        },
      },
      {
        $unwind: { path: '$archive', preserveNullAndEmptyArrays: true },
      },
      //reverse pop image
      {
        $lookup: {
          from: ImageModel.collection.name,
          localField: 'imageId',
          foreignField: '_id',
          as: 'image',
        },
      },
      {
        $unwind: { path: '$image', preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: '$catalogId',
          numTags: { $sum: 1 },
          tags: { $push: '$$ROOT' },
        },
      },
    ])

    log({
      message: `Number of files ${tagsToExport.length}`,
      type: 'info',
    })

    const fileNames = []

    //for each group of tags (grouped by catalog)
    for (let i = 0; i < tagsToExport.length; i++) {
      const tagGroup = tagsToExport[i]

      //get catalog
      const catalog = await CatalogModel.findById(tagGroup._id)
      if (!catalog) {
        continue
      }

      //get qset
      const qSet = await QuestionSetModel.findById(catalog.questionSet)
      if (!qSet) {
        continue
      }

      //get headers
      const qSetHeaders = await getQSetKeys(qSet._id)

      let constantHeaders = [
        '_id',
        'userId',
        'catalogId',
        'archiveId',
        'imageId',
        'date',
      ]

      const formattedTags = []

      //for each tag of the groupped up tags
      for (let j = 0; j < tagGroup.tags.length; j++) {
        const formattedTag = {
          catalog: 'NaN',
          archive: 'NaN',
          image: 'NaN',
        }
        const tagData = tagGroup?.tags[j]

        //add in the constant headers data
        constantHeaders.forEach((key) => {
          formattedTag[key] = tagData[key] ?? 'NaN'
        })

        //add in the qset headers data
        qSetHeaders.forEach((key) => {
          formattedTag[key] = tagData.tags[key] ?? 'NaN'
        })

        //add catalog,archive, and image names
        formattedTag.catalog = catalog.name
        formattedTag.archive = tagData.archive.name
        formattedTag.image = tagData.image.name

        formattedTags.push(formattedTag)
      }

      //We add thse id's after because we dont want to look into the tag for them.
      constantHeaders = [...constantHeaders, 'catalog', 'archive', 'image']

      const csvWriterHeader = [...constantHeaders, ...qSetHeaders].map(
        (element) => {
          return {
            id: element,
            title: element,
          }
        }
      )

      //create file for zipping
      const fileName = `${process.env.TAG_EXPORT_FOLDER}${
        catalog.name
      }_${Date.now()}.csv`
      fileNames.push(fileName)
      const csvWriter = createObjectCsvWriter({
        path: fileName,
        header: csvWriterHeader,
      })

      await csvWriter.writeRecords(formattedTags) // returns a promise
    }

    //start archiving all the exports
    const archive = archiver('zip')

    archive.on('error', function (err) {
      res.status(500).send({ error: err.message })
    })

    //on stream closed we can end the request
    archive.on('end', function () {
      console.log('Archive wrote %d bytes', archive.pointer())
    })

    const zipFileUserName = req.user.data.userName.replace(/\s/g, '')
    const zipFileName = `${zipFileUserName}_export_${Date.now()}.zip`
    res.attachment(zipFileName)

    archive.pipe(res)

    //create zip archive
    for (let i = 0; i < fileNames.length; i++) {
      let tempFileName = fileNames[i].split('/')
      tempFileName = tempFileName[tempFileName.length - 1]
      archive.append(fs.createReadStream(fileNames[i]), { name: tempFileName })
    }
    archive.finalize()
  })
}

export { tagImage, exportTest }
