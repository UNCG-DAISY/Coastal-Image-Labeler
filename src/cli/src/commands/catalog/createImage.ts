import { ImageModel } from '../../models/Image'
import { ArchiveDocument } from '../../../interfaces/models'

interface Params {
  fileName: string
  archiveEntry: ArchiveDocument
}

export async function createImage(params: Params) {
  const { fileName, archiveEntry } = params
  const imagePath = `/${fileName}`

  let imageEntry = await ImageModel.findOne({
    archive: archiveEntry._id,
    path: {
      original: imagePath,
      compressed: imagePath,
    },
    name: fileName,
  })

  if (!imageEntry) {
    try {
      //throw new Error("Testing image error");

      imageEntry = await ImageModel.create({
        archive: archiveEntry._id,
        name: fileName,
        path: {
          original: imagePath,
          compressed: imagePath,
        },
        numberOfMatches: 2,
        taggable: true,
        dateAdded: Date.now(),
      })
      return {
        success: true,
        message: 'Created new image',
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  } else {
    return {
      success: true,
      message: 'Image already exists',
    }
  }
}
