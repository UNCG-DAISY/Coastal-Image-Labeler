import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { NextFunction, Request } from 'express'
import { TagModel } from '../models/Tag'
import { ImageModel } from '../models/Image'
import { imageInCatalog } from '../utils/checks/imageInCatalog'
import { log } from '../utils/logger'
import * as path from 'path'
import stringify from 'csv-stringify'
import archiver from 'archiver'
import fs from 'fs'

//￼
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

    //create
    const newTag = await TagModel.create({
      date: Date.now(),
      imageId: imageId,
      userId: req.user.data._id,
      tags: tags,
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

function getCsvObject(data) {
  const tags: any = data['tags']
  const archive: any = data['archive']
  const user: any = data['user']
  const catalog: any = data['catalog']
  const image: any = data['image']

  const result = {
    userId: data['userId'] || '',
    userName: user && user['userName'] ? user['userName'] : '',
    roles: user && user['roles'] ? user['roles'] : '',
    archiveName: archive && archive['name'] ? archive['name'] : '',
    archiveId: data['archiveId'] || '',
    archiveTaggable: archive && archive['taggable'] ? 'true' : 'false',
    archiveDateAdded:
      archive && archive['dateAdded'] ? archive['dateAdded'] : '',
    imageName: image && image['name'] ? image['name'] : '',
    imageId: data['imageId'] || '',
    imageTaggable: image && image['taggable'] ? 'true' : 'false',
    imageDateAdded: image && image['dateAdded'] ? image['dateAdded'] : '',

    catalogName: catalog && catalog['name'] ? catalog['name'] : '',
    catalogId: data['catalogId'] || '',
  }
  for (const key in tags) {
    // if (tags.hasOwnProperty(key)) {
    result[key] = tags[key]
    // }
  }
  result['catalogYear'] =
    catalog.catalogInfo && catalog.catalogInfo.year
      ? catalog.catalogInfo.year
      : ''
  result['catalogLink'] =
    catalog.catalogInfo && catalog.catalogInfo.link
      ? catalog.catalogInfo.link
      : ''
  result['catalogDescription'] =
    catalog.catalogInfo && catalog.catalogInfo.description
      ? catalog.catalogInfo.description
      : ''
  return result
}

async function processCollectionData(collections) {
  const csvPath = []
  const catalogData = {}
  for (let index = 0; index < collections.length; index++) {
    const catalogName = collections[index]['catalog']
      ? collections[index]['catalog'].name
      : undefined
    if (catalogName) {
      const catalogDataArray = catalogData[catalogName]
      catalogDataArray.push(getCsvObject(collections[index]))
      catalogData[catalogName] = catalogDataArray
    }
    //  else if (catalogName) {
    //     catalogData[catalogName] = [getCsvObject(collections[index])];
    // }
  }

  for (const key in catalogData) {
    const catalogFileName =
      key.split(' ').join('').split('.').join('') + '_' + Date.now()
    csvPath.push(await extractCollectionData(catalogData[key], catalogFileName))
  }
  return csvPath
}

async function extractCollectionData(collection, csvName) {
  const csvHeaders = new Set()
  const composedCSVData = []
  let terrianType = ''
  if (collection) {
    for (let index = 0; index < collection.length; index++) {
      const data = collection[index]
      const csvRows = []
      for (const key in data) {
        csvHeaders.add(key)
        if (Array.isArray(data[key])) {
          terrianType = ''
          for (let count = 0; count < data[key].length; count++) {
            terrianType = terrianType + data[key][count] + ','
          }
          csvRows.push(terrianType)
        } else {
          csvRows.push(data[key])
        }
      }
      composedCSVData.push(csvRows)
    }
    composedCSVData.splice(0, 0, Array.from(csvHeaders))

    const fileName = csvName + '.csv'
    await createCsvFile(fileName, composedCSVData)
    return {
      path: fileName,
      name: csvName + '.csv',
    }
  }
}

async function createCsvFile(fileName, data) {
  return new Promise((resolve, reject) => {
    try {
      fs.createWriteStream(path.join(__dirname, fileName))
      stringify(data, (err, output) => {
        if (err) throw err
        fs.writeFile(path.join(__dirname, fileName), output, (err) => {
          if (err) throw err
          console.log(fileName + ' saved.')
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
        //
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

    console.log('tags :', tagsAndRelatedCollections.length)
    const data = await processCollectionData(tagsAndRelatedCollections) //this processCollectionData function will extract the collection data and create the csv file for each collection
    await createZip(res, data) // once all the csv created zip them and send to client/browser
  }
)
const exportUserTags = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    console.log(
      'UserID -------------------------------------> ',
      req.user.data._id
    )
    const tagsAndRelatedCollections = await TagModel.find({
      userId: req.user.data._id,
    })
      .populate('archive')
      .populate('user')
      .populate('catalog')
      .populate('image')
    console.log('tags :', tagsAndRelatedCollections)
    const data = await processCollectionData(tagsAndRelatedCollections) //this processCollectionData function will extract the collection data and create the csv file for each collection
    await createZip(res, data) // once all the csv created zip them and send to client/browser
  }
)
export { tagImage, exportUserTags, exportAllTags }
