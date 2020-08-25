import { CatalogDocument, AllDocuments } from '../../../../interfaces/models'
import { ExtenedResponse } from '../../../../interfaces'
import { Request, NextFunction } from 'express'
import { ObjectID } from 'mongodb'
import { asyncHandler } from '../../async'
import { log } from '../../../utils/logger'
//✔️
const filterUserCatalogsMiddleware = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const userCatalogs: [ObjectID] = req?.user?.data?.catalogs

    res.advancedResults.data = filterToUserCatalog(
      res?.advancedResults?.data ?? [],
      userCatalogs
    )

    next()
  }
)

//✔️
function filterToUserCatalog(
  catalogs: AllDocuments[],
  userCatalogs: [ObjectID]
) {
  let res: AllDocuments[] = []
  log({
    message: `Filtering ${
      catalogs.length
    } catalog against [${userCatalogs.toString()}]`,
    type: 'info',
  })
  res = catalogs.filter((catalog: CatalogDocument) => {
    return userCatalogs.includes(catalog._id.toString())
  })

  return res
}

export { filterUserCatalogsMiddleware, filterToUserCatalog }
