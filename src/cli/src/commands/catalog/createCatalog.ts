import { CatalogModel } from '../../models/Catalog'
import { getDirectories } from '../../utils/file'
import colorize from '../../utils/colorize'

import { createArchives } from './createArchive'

interface Params {
  path: {
    original: string
    compressed: string
  }
  imageFormat: [string]
  name: string
  questionSet: string
  catalogInfo: {
    year: number
    link: string
    description: string
  }
  taggable: boolean
  imageServeOrder: string | any
}

export async function createCatalog(catalogData: Params) {
  const {
    path,
    catalogInfo,
    imageFormat,
    name,
    questionSet,
    taggable,
    imageServeOrder,
  } = catalogData

  //check if catalog exists. If it does dont create it.
  let catalogEntry = await CatalogModel.findOne({
    name: name,
    path: path,
  })

  if (!catalogEntry) {
    try {
      const newCatalogData = {
        name: name,
        path: path,
        questionSet: questionSet,
        taggable: taggable,
        catalogInfo: {
          ...catalogInfo,
        },
        dateAdded: Date.now(),
        imageServeOrder: undefined,
      }

      if (imageServeOrder) {
        newCatalogData.imageServeOrder = imageServeOrder
      }
      colorize.info(`Creating catalog ${name}`)
      catalogEntry = await CatalogModel.create(newCatalogData)
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  } else {
    colorize.info('Catalog already exists')
  }

  const archiveFolders = getDirectories(path.original)

  //For each archive of a catalog
  for (const archiveName of archiveFolders) {
    const res = await createArchives({
      archiveName: archiveName,
      catalogEntry: catalogEntry,
      catalogPath: path.original,
      imageFormat: imageFormat,
    })

    if (!res.success) {
      colorize.error(res.message)
    }
  }

  return {
    success: true,
    message: 'Created all data',
  }
}
