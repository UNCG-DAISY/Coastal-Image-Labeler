import { asyncHandler } from '@/server/middlewares/async'
import { Request, NextFunction } from 'express'
import { ExtenedResponse, ImagePathTypes } from '@/interfaces/index'
import { ImageModel } from '@/server/models/Image'
import { log } from '@/server/utils/logger'
import { ArchiveModel } from '@/server/models/Archive'
import { CatalogModel } from '@/server/models/Catalog'
import fs from 'fs'

interface Params {
  imagePath: ImagePathTypes
}

function getImagePath({ imagePath }: Params) {
  return asyncHandler(
    async (req: Request, res: ExtenedResponse, next: NextFunction) => {
      const { imageId } = req.params
      log({
        message: `Creating path for image ${imageId}`,
        type: 'info',
      })

      try {
        const image = await ImageModel.findById(imageId)
        if (!image) {
          log({
            message: `Image not found`,
            type: 'error',
          })
          throw `Image id ${imageId} does not exist`
        }

        const archive = await ArchiveModel.findById(image.archive)
        if (!archive) {
          log({
            message: `Archive ${image.archive} not found`,
            type: 'error',
          })
          throw `Archive id ${image.archive} does not exist`
        }

        const catalog = await CatalogModel.findById(archive.catalog)
        if (!catalog) {
          log({
            message: `Catalog ${archive.catalog} not found`,
            type: 'error',
          })
          throw `Catalog id ${archive.catalog} does not exist`
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

          throw `Image at ${res.imagePath} does not exist`
        }
        next()
      } catch (error) {
        log({
          message: error.message,
          type: 'error',
        })
        res.sendFile(process.env.NEXT_PUBLIC_Error_Image)
      }
    }
  )
}

export { getImagePath }
