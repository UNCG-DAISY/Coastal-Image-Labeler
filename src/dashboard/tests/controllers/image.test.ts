import { connectDB, closeConnection } from '../../server/db'
// eslint-disable-next-line
import * as Types from '../../interfaces'

import dotenv from 'dotenv'

dotenv.config({
  path: './site/.env.test.local',
})
dotenv.config({
  path: './site/.env',
})

import { imageInCatalog } from '../../server/utils/checks/imageInCatalog'
import { ImageModel } from '../../server/models/Image'

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await closeConnection()
})

test('Test imageInCatalog: image in valid catalog', async () => {
  const image = await ImageModel.findById('5f336c1de9aea42d24bf0f23')
  const resData = await imageInCatalog(image, ['5f336c1de9aea42d24bf0f21'])

  //assert
  expect(resData.success).toBe(true)
  expect(resData.message).toBe(
    `Image 5f336c1de9aea42d24bf0f23 exists in a catalog user can tag`
  )
})

test('Test imageInCatalog: image in invalid catalog', async () => {
  const image = await ImageModel.findById('5f336c1de9aea42d24bf0f23')
  const resData = await imageInCatalog(image, ['5f3b2e7265477a68b819335a'])

  //assert
  expect(resData.success).toBe(false)
  expect(resData.message).toBe(
    'Image 5f336c1de9aea42d24bf0f23 does not exists in a catalog user can tag'
  )
})
