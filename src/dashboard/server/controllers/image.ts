import { asyncHandler } from '../middlewares/async'
import { Request, NextFunction } from 'express'
import { ExtenedResponse } from '../../interfaces/index'
import { ImageModel } from '../models/Image'
import { log } from '../utils/logger'
import { ArchiveModel } from '../models/Archive'
import { CatalogModel } from '../models/Catalog'
import { ErrorResponse } from '@/utils/errorResponse'
import fs from 'fs'

const getImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { imageId, type } = req.params

    log({
      message: `Getting image for id = ${imageId} of type = ${type}`,
      type: 'info',
    })

    try {
      //get image, archive and catalog to build path
      //get image
      const image = await ImageModel.findById(imageId)
      if (!image) {
        log({
          message: `Image not found in DB`,
          type: 'error',
        })
        throw new ErrorResponse(`Image id ${imageId} does not exist`, 404)
      }

      //get archive of image
      const archive = await ArchiveModel.findById(image.archive)
      if (!archive) {
        log({
          message: `Archive ${image.archive} not found`,
          type: 'error',
        })
        throw new ErrorResponse(
          `Archive id ${image.archive} does not exist`,
          404
        )
      }

      //get catalog of image
      const catalog = await CatalogModel.findById(archive.catalog)
      if (!catalog) {
        log({
          message: `Catalog ${archive.catalog} not found`,
          type: 'error',
        })
        throw new ErrorResponse(
          `Catalog id ${archive.catalog} does not exist`,
          404
        )
      }

      let imageKeyPath = type
      if (!imageKeyPath) {
        log({
          message: `Image path type is undefined for image ${imageId}, defaulting to original`,
          type: 'info',
        })
        imageKeyPath = 'original'
      }

      res.imagePath = `${catalog.path[imageKeyPath]}${archive.path[imageKeyPath]}${image.path[imageKeyPath]}`

      //check if path exists, if not default to original. If original doesnt, throw
      if (!fs.existsSync(res.imagePath)) {
        log({
          message: `Image at ${res.imagePath} does not exist. Defaulting to original`,
          type: 'error',
        })
        res.imagePath = `${catalog.path.original}${archive.path.original}${image.path.original}`

        //after changing to original check to see if it exists, if not throw
        if (!fs.existsSync(res.imagePath)) {
          log({
            message: `Default path for ${imageId} at ${res.imagePath} does not exist, showing error image`,
            type: 'error',
          })
          throw new ErrorResponse(
            `Original path for image at ${res.imagePath} does not exist`,
            404
          )
        }
      }

      return next()
    } catch (error) {
      log({
        message: error.message,
        type: 'error',
      })

      return res.sendFile(process.env.NEXT_PUBLIC_Error_Image)
    }
  }
)
export { getImage }
