import 'module-alias/register'
// import * as Types from '@/interfaces/index'
import dotenv from 'dotenv'

// Load env vars
dotenv.config({
  path: './.env.sandbox.local',
})

import { connectDB, closeConnection } from './db'
import { log } from '@/utils/logger'
import { RegisterModels, RegisterModelDefaults } from '@/models/index'

//Remember if some modles are not used, make sure to comment them out.
//THe linter will cry about unused imports
import { ArchiveModel } from '@/models/Archive'
import { AssignedImageModel } from '@/models/AssignedImages'
import { CatalogModel } from '@/models/Catalog'
import { ImageModel } from '@/models/Image'
import { QuestionSetModel } from '@/models/QuestionSet'
import { TagModel } from '@/models/Tag'
import { UserModel } from '@/models/User'

async function main() {
  await connectDB()

  RegisterModels()
  await RegisterModelDefaults()

  await sandbox()

  await closeConnection()
}

async function sandbox() {
  log({
    message: 'Starting sandbox function',
    type: 'ok',
  })

  const [
    archiveRes,
    assingedImagesRes,
    catalogRes,
    imageRes,
    questionSetRes,
    tagRes,
    userRes,
  ] = await Promise.all([
    ArchiveModel.find({}),
    AssignedImageModel.find({}),
    CatalogModel.find({}),
    ImageModel.find({}),
    QuestionSetModel.find({}),
    TagModel.find({}),
    UserModel.find({}),
  ])

  log({
    message: `# of Archives: ${archiveRes.length}`,
    type: 'info',
  })
  log({
    message: `# of Assinged Images: ${assingedImagesRes.length}`,
    type: 'info',
  })
  log({
    message: `# of Catalogs: ${catalogRes.length}`,
    type: 'info',
  })
  log({
    message: `# of Images: ${imageRes.length}`,
    type: 'info',
  })
  log({
    message: `# of Question sets: ${questionSetRes.length}`,
    type: 'info',
  })
  log({
    message: `# of Tags: ${tagRes.length}`,
    type: 'info',
  })
  log({
    message: `# of Users: ${userRes.length}`,
    type: 'info',
  })

  log({
    message: 'Ending sandbox function',
    type: 'ok',
  })
}
main()
