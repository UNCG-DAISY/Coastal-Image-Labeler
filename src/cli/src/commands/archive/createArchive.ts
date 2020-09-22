//functions for making archives

import { ArchiveModel } from '../../models/Archive'
import { CatalogDocument } from '../../../interfaces/models'
import { createImage } from '../catalog/createImage'
import Glob from 'glob-promise'
import { ImageModel } from '../../models/Image'
import { CreateImageReturn } from '../../../interfaces'

interface Params {
  catalogPath?: string
  archiveName: string
  catalogEntry: CatalogDocument
  imageFormat: string[]
}

export async function createArchives(params: Params) {
  const { archiveName, catalogEntry, imageFormat } = params

  const archivePath = `/${archiveName}`
  const totalPath = `${catalogEntry.path.original}${archivePath}`

  //get all images
  const images = Glob.sync(`${totalPath}/**/*{${imageFormat.toString()}}`).map(
    (imagePath) => {
      return imagePath.replace(totalPath, '')
    }
  )

  try {
    //colorize.info(`Creating archive ${archiveName}`)
    const archiveEntry = await ArchiveModel.create({
      catalog: catalogEntry._id,
      name: archiveName,
      path: {
        original: archivePath,
        compressed: archivePath,
      },
      taggable: true,
      dateAdded: Date.now(),
    })

    const errors = []
    const imageCreationObj: CreateImageReturn[] = []

    for (const image of images) {
      const imageNameSplit = image.split('/')
      imageCreationObj.push(
        createImage({
          archiveEntry: archiveEntry,
          fileName: imageNameSplit[imageNameSplit.length - 1],
          imagePath: image,
        })
      )
    }

    await ImageModel.insertMany(imageCreationObj)
    await archiveEntry.updateArchiveImageCount()

    return {
      success: true,
      message: 'Done',
      data: errors,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: {
        catalogEntry: catalogEntry._id,
        archiveName: archiveName,
        message: error.message,
      },
    }
  }
}
