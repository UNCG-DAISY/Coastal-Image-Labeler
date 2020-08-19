import { ArchiveModel } from '../../models/Archive'
import { CatalogModel } from '../../models/Catalog'
import { ObjectID } from 'mongodb'
import { log } from '../logger'

export async function CatalogOfArchivePartOfUser(
  archiveId: string,
  userCatalogs: [ObjectID]
) {
  log({
    message: `Checking if archive ${archiveId} is in userCatalog ${userCatalogs.toString()}`,
    type: 'info',
  })
  try {
    const archive = await ArchiveModel.findById(archiveId)
    if (!archive) {
      log({
        message: `Archive ${archiveId} does not exist`,
        type: 'error',
      })
      return false
    }

    const catalog = await CatalogModel.findById(archive.catalog)
    //check if catalog still exists
    if (!catalog) {
      log({
        message: `Catalog id = ${archive.catalog} of archive ${archiveId} does not exist`,
        type: 'error',
      })
      return false
    }

    log({
      message: `Archive belongs to catalog user can tag`,
      type: 'ok',
    })
    return userCatalogs.includes(archive.catalog)
  } catch {
    log({
      message: `Error`,
      type: 'error',
    })
    return false
  }
}
