import { ArchiveModel } from '../../models/Archive'
import { CatalogModel } from '../../models/Catalog'
import { ImageDocument } from '../../../interfaces/models'
import { ObjectID } from 'mongodb'
import { log } from '../logger'

//✔️
export async function imageInCatalog(
  image: ImageDocument,
  userCatalogs: ObjectID[] | string[]
) {
  const imageId = image._id
  log({
    message: `Checking if image ${
      image._id
    } is in user catalogs ${userCatalogs.toString()}`,
    type: 'info',
  })
  if (!image) {
    return {
      success: false,
      message: `Image ${imageId} does not exist`,
    }
  }

  const archive = await ArchiveModel.findById(image.archive)
  if (!archive) {
    log({
      message: `Cant find archive of image ${image._id}`,
      type: 'error',
    })
    return {
      success: false,
      message: `Archive ${image.archive} of image ${imageId} does not exist`,
    }
  }

  const catalog = await CatalogModel.findById(archive.catalog)
  if (!catalog) {
    log({
      message: `Cant find catalog of archive ${archive._id}`,
      type: 'error',
    })
    return {
      success: false,
      message: `Catalog ${archive.catalog} of Archive ${image.archive} of image ${imageId} does not exist`,
    }
  }

  if (userCatalogs.includes(catalog._id.toString())) {
    log({
      message: `Image exists in catalog user can tag`,
      type: 'ok',
    })
    return {
      success: true,
      message: `Image ${image._id} exists in a catalog user can tag`,
    }
  } else {
    log({
      message: `Image does NOT exists in catalog user can tag`,
      type: 'error',
    })
    return {
      success: false,
      message: `Image ${image._id} does not exists in a catalog user can tag`,
    }
  }
}
