import {
  CatalogDocument,
  AllDocuments,
  ArchiveDocument,
} from '@/interfaces/models'
import { ExtenedResponse } from '@/interfaces/index'
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

    res.advancedResults.data = filterTaggableArchives(
      res?.advancedResults?.data as CatalogDocument[]
    )

    next()
  }
)

//✔️
function filterToUserCatalog(
  catalogs: AllDocuments[],
  userCatalogs: [ObjectID]
) {
  let res: CatalogDocument[] = []
  log({
    message: `Filtering ${
      catalogs.length
    } catalog against [${userCatalogs.toString()}]`,
    type: 'info',
  })

  res = catalogs.filter((catalog: CatalogDocument) => {
    return userCatalogs.includes(catalog._id.toString()) && catalog.taggable
  }) as CatalogDocument[]

  return res
}

function filterTaggableArchives(catalogs: CatalogDocument[]) {
  const res: CatalogDocument[] = []
  log({
    message: `Only allowing taggable archives`,
    type: 'info',
  })

  for (let i = 0; i < catalogs.length; i++) {
    const catalog = catalogs[i]
    catalog.archives = catalog.archives.filter((archive: ArchiveDocument) => {
      return archive.taggable
    })
    res.push(catalog)
  }

  return res
}

export { filterUserCatalogsMiddleware, filterToUserCatalog }
