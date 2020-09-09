//import inquirer from 'inquirer'
import colors from 'colors'
colors
// import {yesNoOnly,translateYesNoToBool} from '../utils/validation'

import MongoConnection from '../../lib/MongoConnection'
import UriManager from '../../lib/UriManager'

// import colorize from '../utils/colorize'

//import {isRequired} from '../utils/validation'
import fs from 'fs'

import unhandledRejection from '../../utils/unhandledRejection'
unhandledRejection

import { createCatalog } from './createCatalog'
import colorize from '../../utils/colorize'

import { performance } from 'perf_hooks'
import { CatalogDocument } from '../../../interfaces/models'
import { CatalogModel } from '../../models/Catalog'
// import { ArchiveModel } from '../../models/Archive'

interface Options {
  path: string
}

const catalog = {
  async add(options: Options) {
    const { path } = options

    //connect to db
    const uriManager = new UriManager()
    const mongoConnection = new MongoConnection(uriManager.getKey())
    await mongoConnection.connect()

    //Read the settings json
    const file = JSON.parse(fs.readFileSync(path, 'utf8'))

    //For each catalog provided
    for (let i = 0; i < file.catalogs.length; i++) {
      const t1 = performance.now()

      const catalog = file.catalogs[i]
      const {
        path: catalogPathInfo,
        imageFormat,
        name,
        questionSet,
        catalogInfo,
        taggable,
        imageServeOrder,
        ignoreFields,
      } = catalog

      const res = await createCatalog({
        path: catalogPathInfo,
        imageFormat: imageFormat,
        name: name,
        questionSet: questionSet,
        taggable: taggable,
        catalogInfo: catalogInfo,
        imageServeOrder: imageServeOrder,
        ignoreFields: ignoreFields,
      })

      if (!res.success) {
        colorize.error(res.message)
      } else {
        colorize.success(res.message)
      }

      const t2 = performance.now()

      console.info(`Catalog ${name} = ${t2 - t1}ms`)
    }

    await mongoConnection.close()
  },
  async delete({ id }: { id: string }) {
    //connect to db
    const uriManager = new UriManager()
    const mongoConnection = new MongoConnection(uriManager.getKey())
    await mongoConnection.connect()

    let catalog: CatalogDocument
    //check to see if archive exists.
    try {
      catalog = await CatalogModel.findById(id)
      if (catalog) {
        const t1 = performance.now()
        await catalog.remove()
        const t2 = performance.now()
        console.log(`Catalog deletion = ${t2 - t1}ms`)
      } else {
        throw `Catalog doesnt exist with id ${id}`
      }
    } catch (error) {
      console.log('---Error---')
      console.log(error)
    }

    await mongoConnection.close()
  },
}

export default catalog
