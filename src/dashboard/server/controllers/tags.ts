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
import path from 'path'
import archiver from 'archiver'
import stringify from 'csv-stringify'
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
    })

    res.newTag = newTag

    next()
  }
)

function getCsvObject(data) {
  const tags: any = data['tags']
  const archive: any = data['archive']
  const user: any = data['user']
  const catalog: any = data['catalog']
  const image: any = data['image']

  const result = {
    userId: data['userId'] || '',
    userName: user && user['userName'] ? user['userName'] : '',
    roles: user && user['roles'] ? user['roles'].join('-') : '',
    archiveName: archive && archive['name'] ? archive['name'] : '',
    archiveId: data['archiveId'] || '',
    archiveTaggable: archive && archive['taggable'] ? 'true' : 'false',
    archiveDateAdded:
      archive && archive['dateAdded']
        ? JSON.stringify(archive['dateAdded'])
        : '',
    imageName: image && image['name'] ? image['name'] : '',
    imageId: data['imageId'] || '',
    imageTaggable: image && image['taggable'] ? 'true' : 'false',
    imageDateAdded:
      image && image['dateAdded'] ? JSON.stringify(image['dateAdded']) : '',

    catalogName: catalog && catalog['name'] ? catalog['name'] : '',
    catalogId: data['catalogId'] || '',
    catalogYear:
      catalog.catalogInfo && catalog.catalogInfo.year
        ? JSON.stringify(catalog.catalogInfo.year)
        : '',
    catalogLink:
      catalog.catalogInfo && catalog.catalogInfo.link
        ? catalog.catalogInfo.link
        : '',
  }

  for (const key in tags) {
    if (typeof tags[key] === 'boolean' && tags[key]) {
      result[`tag_${key}`] = 'true'
    } else if (typeof tags[key] === 'boolean' && !tags[key]) {
      result[`tag_${key}`] = 'false'
    } else {
      result[`tag_${key}`] = tags[key]
    }
  }

  return result
}

async function processCollectionData(
  collections,
  catalogNamesFilter: { filter: boolean; catalogNames: any[] }
) {
  const csvPath = []
  const catalogData = {}
  for (let index = 0; index < collections.length; index++) {
    const catalogName = collections[index]['catalog']
      ? collections[index]['catalog'].name
      : undefined
    if (catalogName) {
      if (catalogNamesFilter.filter) {
        if (catalogNamesFilter.catalogNames.indexOf(catalogName) >= 0) {
          if (
            catalogName &&
            Object.prototype.hasOwnProperty.call(catalogData, catalogName)
          ) {
            const catalogDataArray = catalogData[catalogName]
            catalogDataArray.push(getCsvObject(collections[index]))
            catalogData[catalogName] = catalogDataArray
          } else if (catalogName) {
            catalogData[catalogName] = [getCsvObject(collections[index])]
          }
        }
      } else {
        if (
          catalogName &&
          Object.prototype.hasOwnProperty.call(catalogData, catalogName)
        ) {
          const catalogDataArray = catalogData[catalogName]
          catalogDataArray.push(getCsvObject(collections[index]))
          catalogData[catalogName] = catalogDataArray
        } else if (catalogName) {
          catalogData[catalogName] = [getCsvObject(collections[index])]
        }
      }
    }
  }
  for (const key in catalogData) {
    const catalogFileName =
      key.split(' ').join('').split('.').join('') + '_' + Date.now()
    csvPath.push(await extractCollectionData(catalogData[key], catalogFileName))
  }
  return csvPath
}

async function extractCollectionData(collection, csvName) {
  const csvHeaders = []
  const composedCSVData = []
  for (let index = 0; index < collection.length; index++) {
    const data = collection[index]
    const csvRows = []

    for (const key in data) {
      let singleData = ''
      if (csvHeaders.indexOf(key) < 0) {
        csvHeaders.push(key)
      }
      if (Array.isArray(data[key])) {
        singleData = data[key][0]
        for (let count = 1; count < data[key].length; count++) {
          singleData = singleData + ',' + data[key][count]
        }
      } else {
        singleData = data[key]
      }
      csvRows[csvHeaders.indexOf(key)] = singleData
    }

    composedCSVData.push(csvRows)
  }
  composedCSVData.splice(0, 0, csvHeaders)
  const fileName = csvName + '.csv'
  await createCsvFile(fileName, composedCSVData)
  return {
    path: fileName,
    name: csvName + '.csv',
  }
}

async function createCsvFile(fileName, data) {
  return new Promise((resolve, reject) => {
    try {
      log({
        message: `Trying to create file at ${fileName}`,
        type: 'info',
      })
      fs.createWriteStream(path.join(__dirname, fileName))
      stringify(data, (err, output) => {
        if (err) throw err
        fs.writeFile(path.join(__dirname, fileName), output, (err) => {
          if (err) throw err
          log({
            message: `Created file at ${fileName}`,
            type: 'ok',
          })
          resolve(data)
        })
      })
    } catch (e) {
      console.log(
        'unable to process the create csv operations some exception occurred :',
        e
      )
      reject(e)
    }
  })
}

function createZip(res: any, csvs: any) {
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  })
  archive.on('warning', (err) => {
    console.log('error2', err)
    throw err
  })
  archive.on('error', (err) => {
    console.log('error1', err)
    throw err
  })
  archive.pipe(res)
  for (let index = 0; index < csvs.length; index++) {
    archive.append(
      fs.createReadStream(path.join(__dirname, csvs[index].path)),
      { name: csvs[index].name }
    )
    fs.unlink(path.join(__dirname, csvs[index].path), (_err) => {
      if (_err) {
        console.log('_err', _err)
      }
    })
  }
  archive.finalize()
}

const exportAllTags = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const tagsAndRelatedCollections = await TagModel.find({})
      .populate('archive')
      .populate('user')
      .populate('catalog')
      .populate('image')
    const catalogNamesFilter = {
      filter: req.body.filter === 'true' || req.body.filter == true,
      catalogNames: req.body.catalogNames || [],
    }
    //console.log('tags :', tagsAndRelatedCollections.length)
    const data = await processCollectionData(
      tagsAndRelatedCollections,
      catalogNamesFilter
    ) //processCollectionData function extracts the collection data and createscsv file for each collection
    if (data.length) {
      await createZip(res, data)
    } else {
      return data
    }
  }
)
const exportUserTags = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const tagsAndRelatedCollections = await TagModel.find({
      userId: req.user.data._id,
    })
      .populate('archive')
      .populate('user')
      .populate('catalog')
      .populate('image')
    const catalogNamesFilter = {
      filter: req.body.filter === 'true' || req.body.filter == true,
      catalogNames: req.body.catalogNames || [],
    }

    const data = await processCollectionData(
      tagsAndRelatedCollections,
      catalogNamesFilter
    ) // processCollectionData function extracts collection data and creates a csv file for each collection
    if (data.length) {
      await createZip(res, data)
    } else {
      return data
    }
  }
)
export { tagImage, exportUserTags, exportAllTags }
