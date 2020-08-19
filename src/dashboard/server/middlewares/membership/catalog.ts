import { asyncHandler } from '../async'
// import { ResPartOfCatalog } from '../../../interfaces'
import { Request, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { ArchiveModel } from '../../models/Archive'
import { ImageModel } from '../../models/Image'
import { ExtenedResponse } from '../../../interfaces'
import { log } from '../../utils/logger'

//✔️
//checks if a given catalogId exists in a given user catalog
async function membershipCatalog(userCatalog: [ObjectId], catalogId: string) {
  let result = false
  log({
    message: `Checking if catalog ${catalogId} is in ${userCatalog.toString()}`,
    type: 'info',
  })
  userCatalog.forEach((catalog) => {
    if (catalog.toString() === catalogId) {
      result = true
    }
  })

  return result
}

//✔️
const membershipCatalogMiddleware = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { user } = req
    let { catalogId } = req.body
    const { archiveId, imageId } = req.body

    try {
      if (imageId) {
        const image = await ImageModel.findById(imageId)
        const archive = await ArchiveModel.findById(image.archive)
        catalogId = archive.catalog.toString()
      }
      if (archiveId) {
        const archive = await ArchiveModel.findById(archiveId)
        catalogId = archive.catalog.toString()
      }
      const result = await membershipCatalog(
        user?.data?.catalogs,
        catalogId.toString()
      )

      if (result) {
        res.membershipCatalog = true
        next()
      } else {
        res.status(401).json({
          success: false,
          message: `User has no membership to catalog Id ${catalogId}`,
        })
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
)

export { membershipCatalog, membershipCatalogMiddleware }
