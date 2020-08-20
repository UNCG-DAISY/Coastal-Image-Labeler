// import * as Types from '../interfaces'
// Types

import dotenv from 'dotenv'
import { RegisterModels } from './models'
import { connectDB, closeConnection } from './db'
import { log } from './utils/logger'
import { ImageServeOrderModel } from './models/ImageServeOrder'
// import fs from 'fs'
import { ArchiveModel } from './models/Archive'
import { AssignedImageModel } from './models/AssignedImages'
import { CatalogModel } from './models/Catalog'
import { ImageModel } from './models/Image'
import { TagModel } from './models/Tag'
import { UserModel } from './models/User'
import { QuestionSetModel } from './models/QuestionSet'
import archiveData from '../data/test/archives.json'
import assingedData from '../data/test/assigned_images.json'
import catalogData from '../data/test/catalog.json'
import serveOrderData from '../data/test/image_server_order.json'
import imagesData from '../data/test/images.json'
import questionSetData from '../data/test/question_set.json'
import usersData from '../data/test/users.json'
//const archiveData = fs.readFileSync(`${__dirname}/data/test/archives.json`,'utf-8')

const env = process.env.NODE_ENV ?? 'development'

switch (env) {
  case 'development':
    dotenv.config({
      path: './site/.env.development.local',
    })
    break
  case 'production':
    dotenv.config({
      path: './site/.env.production.local',
    })
    break
  case 'test':
    dotenv.config({
      path: './site/.env.test.local',
    })
    break
  default:
    dotenv.config({
      path: './site/.env',
    })
    break
}

async function main() {
  await connectDB()
  RegisterModels()

  await deleteAll()
  await createAll()

  await closeConnection()
  process.exit(0)
}
main()

async function deleteAll() {
  const models = [
    ArchiveModel.deleteMany({}),
    AssignedImageModel.deleteMany({}),
    CatalogModel.deleteMany({}),
    ImageModel.deleteMany({}),
    ImageServeOrderModel.deleteMany({}),
    TagModel.deleteMany({}),
    UserModel.deleteMany({}),
    QuestionSetModel.deleteMany({}),
  ]
  log({
    message: 'Deleting all data',
  })
  await Promise.all(models)
}
async function createAll() {
  await CatalogModel.create(catalogData)
  await ArchiveModel.create(archiveData)
  await ImageModel.create(imagesData)
  await AssignedImageModel.create(assingedData)
  await ImageServeOrderModel.create(serveOrderData)
  await QuestionSetModel.create(questionSetData)
  //@ts-ignore for some reason typescript is crying here
  await UserModel.create(usersData)
  log({
    message: 'Created all data',
  })
}

process.on('unhandledRejection', (err: any) => {
  log({
    message: `--Error--: ${err?.message ?? 'undefined error'}`,
    type: 'error',
  })

  closeConnection()
  process.exit(1)
})
