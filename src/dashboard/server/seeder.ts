//Seeder function for adding data, bypasses the CLI for test.
// Types
import 'module-alias/register'

import dotenv from 'dotenv'
import { RegisterModels } from './models'
import { connectDB, closeConnection } from './db'
import { log } from './utils/logger'
import { ArchiveModel } from './models/Archive'
import { AssignedImageModel } from './models/AssignedImages'
import { CatalogModel } from './models/Catalog'
import { ImageModel } from './models/Image'
import { TagModel } from './models/Tag'
import { UserModel } from './models/User'
import { QuestionSetModel } from './models/QuestionSet'

import archiveData from '@/data/test/archives.json'
import assingedData from '@/data/test/assigned_images.json'
import catalogData from '@/data/test/catalog.json'
import imagesData from '@/data/test/images.json'
import questionSetData from '@/data/test/question_set.json'
import usersData from '@/data/test/users.json'

const env = process.env.NODE_ENV ?? 'development'

switch (env) {
  case 'development':
    dotenv.config({
      path: './.env.development.local',
    })
    break
  case 'production':
    dotenv.config({
      path: './.env.production.local',
    })
    break
  case 'test':
    dotenv.config({
      path: './.env.test.local',
    })
    break
  default:
    dotenv.config({
      path: '.env',
    })
    break
}

async function main() {
  console.log(process.env.MONGO_URI)
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
    //ImageServeOrderModel.deleteMany({}),
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
  //@ts-ignore
  await CatalogModel.create(catalogData)
  await ArchiveModel.create(archiveData)
  await ImageModel.create(imagesData)
  await AssignedImageModel.create(assingedData)
  //@ts-ignore
  //await ImageServeOrderModel.create(serveOrderData)
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
