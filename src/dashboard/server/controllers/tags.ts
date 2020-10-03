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

//✔️
const tagImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { userId, imageId, tags } = req.body

    log({
      message: `Tagging image ${imageId} by user ${userId}`,
      type: 'info',
    })
    log({
      message: tags,
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
      tagWithDefault[key] = tags[key]
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
    //   log({
    //     message: `Image ${imageId} is finalizable`,
    //     type: 'info',
    //   })
    //   await ImageModel.updateOne(
    //     { _id: imageId },
    //     { finalTag: newTag._id, taggable: true }
    //   )
    // }

    next()
  }
)

const exportUserTags = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const tags = await TagModel.find({ userId: req.user.data._id })
      .populate('archive')
      .populate('user')
      .populate('catalog')
      .populate('image')
    // console.log("tags :", tags);
    res.status(200).json({
      success: true,
      data: tags,
      message: `done`,
    })
  }
)

const exportAllTags = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const allTags = await TagModel.find({})
      .populate('archive')
      .populate('user')
      .populate('catalog')
      .populate('image')
    res.status(200).json({
      success: true,
      message: `done`,
      data: allTags,
    })
  }
)
export { tagImage, exportUserTags, exportAllTags }
