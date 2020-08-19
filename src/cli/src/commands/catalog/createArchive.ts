import { ArchiveModel } from '../../models/Archive'
import { getFiles } from '../../utils/file'
import { CatalogDocument } from '../../../interfaces/models'
import colorize from '../../utils/colorize'
import { createImage } from './createImage'

interface Params {
  catalogPath: string
  archiveName: string
  catalogEntry: CatalogDocument
  imageFormat: [string]
}

export async function createArchives(params: Params) {
  const { archiveName, catalogPath, catalogEntry, imageFormat } = params

  const archivePath = `/${archiveName}`
  const images = getFiles(`${catalogPath}/${archivePath}`, imageFormat)

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
    const res = await createImage({
      archiveEntry: archiveEntry,
      fileName: image,
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
