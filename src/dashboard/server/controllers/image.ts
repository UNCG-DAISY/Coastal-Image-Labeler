import { asyncHandler } from '../middlewares/async'
import { Request, NextFunction } from 'express'
import { ExtenedResponse } from '../../interfaces'
import { ImageModel } from '../models/Image'
import { log } from '../utils/logger'
import { ArchiveModel } from '../models/Archive'
import { CatalogModel } from '../models/Catalog'
import fs from 'fs'

interface Params {
  imagePath: 'Compressed' | 'Original'
}

function getImagePath({ imagePath }: Params) {
  return asyncHandler(
    async (req: Request, res: ExtenedResponse, next: NextFunction) => {
      const { imageId } = req.params
      log({
        message: `Creating path for image ${imageId}`,
        type: 'info',
      })

      const image = await ImageModel.findById(imageId)
      if (!image) {
        log({
          message: `Image not found`,
          type: 'error',
        })
        return res.sendFile(process.env.NEXT_PUBLIC_Error_Image)
      }

      const archive = await ArchiveModel.findById(image.archive)
      if (!archive) {
        log({
          message: `Archive ${image.archive} not found`,
          type: 'error',
        })
        res.sendFile(process.env.NEXT_PUBLIC_Error_Image)
      }

      const catalog = await CatalogModel.findById(archive.catalog)
      if (!catalog) {
        log({
          message: `Catalog ${archive.catalog} not found`,
          type: 'error',
        })
        res.sendFile(process.env.NEXT_PUBLIC_Error_Image)
      }

      switch (imagePath) {
        case 'Compressed':
          res.imagePath = `${catalog.path.compressed}${archive.path.compressed}${image.path.compressed}`
          break

        case 'Original':
          res.imagePath = `${catalog.path.original}${archive.path.original}${image.path.original}`
          break

        default:
          return res.sendFile(process.env.NEXT_PUBLIC_Error_Image)
      }

      if (!fs.existsSync(res.imagePath)) {
        log({
          message: `Image at ${res.imagePath} does not exist`,
          type: 'error',
        })

        return res.sendFile(process.env.NEXT_PUBLIC_Error_Image)
      }
      next()
    }
  )
}

export { getImagePath }
