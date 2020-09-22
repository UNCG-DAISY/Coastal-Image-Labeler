//function for making catalogs

import { CatalogModel } from '../../models/Catalog'
import { getDirectories } from '../../utils/file'
import colorize from '../../utils/colorize'
import { createArchives } from '../archive/createArchive'
import cliProgress from 'cli-progress'

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
  ignoreFields: string[]
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
    ignoreFields,
  } = catalogData

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
      ignoreFields: ignoreFields,
    }

    if (imageServeOrder) {
      newCatalogData.imageServeOrder = imageServeOrder
    }
    colorize.info(`Creating catalog ${name}`)
    const catalogEntry = await CatalogModel.create(newCatalogData)

    const archiveFolders = getDirectories(path.original)

    const archiveCreationBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    )
    archiveCreationBar.start(archiveFolders.length, 0)

    let count = 0
    const errors = []
    //For each archive of a catalog
    for (const archiveName of archiveFolders) {
      const res = await createArchives({
        archiveName: archiveName,
        catalogEntry: catalogEntry,
        catalogPath: path.original,
        imageFormat: imageFormat,
      })

      if (!res.success) {
        errors.push(res.data)
      }
      count++
      archiveCreationBar.update(count)
    }

    archiveCreationBar.stop()
    errors.length > 0 ? console.log(errors) : undefined

    return {
      success: true,
      message: 'Created all data',
    }
  } catch (error) {
    // console.log(`Error creating catalog`,error)
    // console.log('Entry',{name,path})
    return {
      success: false,
      message: error.message,
    }
  }
}
