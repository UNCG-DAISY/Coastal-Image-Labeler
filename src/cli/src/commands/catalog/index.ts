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
import { ImageServeOrderModel } from '../../models/ImageServeOrder'
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
      const timeStart = process.hrtime()

      const catalog = file.catalogs[i]
      const {
        path: catalogPathInfo,
        imageFormat,
        name,
        questionSet,
        catalogInfo,
        taggable,
        imageServeOrder,
      } = catalog

      //if an id is given use that
      let newServeOrderId = { _id: imageServeOrder }

      //if that id is a object, make a new serve order
      if (typeof imageServeOrder == 'object') {
        const createdServeOrder = await ImageServeOrderModel.create({
          type: 'sequential',
          data: imageServeOrder,
        })

        newServeOrderId = createdServeOrder?._id
      }

      //if none given, assign the random one
      if (!imageServeOrder) {
        const randomOrder = await ImageServeOrderModel.findOne({
          type: 'random',
        })

        newServeOrderId = randomOrder?._id
      }

      const res = await createCatalog({
        path: catalogPathInfo,
        imageFormat: imageFormat,
        name: name,
        questionSet: questionSet,
        taggable: taggable,
        catalogInfo: catalogInfo,
        imageServeOrder: newServeOrderId?._id,
      })

      if (!res.success) {
        colorize.error(res.message)
      } else {
        colorize.success(res.message)
      }

      const timeEnd = process.hrtime(timeStart)

      console.info(`Catalog ${name} = ${timeEnd[1] / 1000000}ms`)
    }

    await mongoConnection.close()
  },
}

export default catalog
