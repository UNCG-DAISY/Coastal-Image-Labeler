import { ArchiveModel } from '../../models/Archive'
//import { getFiles } from '../../utils/file'
import { CatalogDocument } from '../../../interfaces/models'
import colorize from '../../utils/colorize'
import { createImage } from './createImage'

import Glob from 'glob-promise'
//import path from 'path'

interface Params {
  catalogPath: string
  archiveName: string
  catalogEntry: CatalogDocument
  imageFormat: [string]
}

export async function createArchives(params: Params) {
  const { archiveName, catalogPath, catalogEntry, imageFormat } = params

  const archivePath = `/${archiveName}`
  const totalPath = `${catalogPath}${archivePath}`

  //const images = getFiles(`${catalogPath}/${archivePath}`, imageFormat)
  const images = Glob.sync(`${totalPath}/**/*{${imageFormat.toString()}}`).map(
    (imagePath) => {
      return imagePath.replace(totalPath, '')
    }
  )

  //console.log(images)
  //console.log(images)

  let archiveEntry = await ArchiveModel.findOne({
    catalog: catalogEntry._id,
    name: archiveName,
    path: {
      original: archivePath,
      compressed: archivePath,
    },
  })
  if (!archiveEntry) {
    try {
      //throw new Error("TESTING ARCHIVE error");
      archiveEntry = await ArchiveModel.create({
        catalog: catalogEntry._id,
        name: archiveName,
        path: {
          original: archivePath,
          compressed: archivePath,
        },
        taggable: true,
        dateAdded: Date.now(),
      })
      //colorize.success('Created new archive')
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  } else {
    colorize.info('Archive already exists')
  }

  for (const image of images) {
    const imageNameSplit = image.split('/')
    const res = await createImage({
      archiveEntry: archiveEntry,
      fileName: imageNameSplit[imageNameSplit.length - 1],
      imagePath: image,
    })
    if (!res.success) {
      colorize.error(res.message)
    }
  }

  return {
    success: true,
    message: 'Archives and images created',
  }
}
