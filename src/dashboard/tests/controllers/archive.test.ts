import httpMocks from 'node-mocks-http'
import { connectDB, closeConnection } from '../../server/db'
// eslint-disable-next-line
import * as Types from '../../interfaces'

import dotenv from 'dotenv'

//load env variables
dotenv.config({
  path: './.env.test.local',
})
dotenv.config({
  path: './.env',
})
import { archiveExists } from '../../server/controllers/archives'

//Test to see if an archive exists
test('Test archiveExists Controller: Success', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    archiveId: '5f336c1de9aea42d24bf0f22',
  }
  const res = httpMocks.createResponse()

  await archiveExists(req, res, () => {
    return
  })

  //assert result
  expect(res.archive.name).toBe('catlog2arc1')
  expect(res.archive.catalog.toString()).toBe('5f3b2e7265477a68b819335a')
  expect(res.archive.totalImages).toBe(3)
})

//test to see what would happen if an archive doesnt exist
test('Test archiveExists Controller: No Archive with given Id', async () => {
  //create mock
  const req = httpMocks.createRequest()
  req.body = {
    archiveId: '5f336c1de9aea42d24bf0f21',
  }
  const res = httpMocks.createResponse()

  await archiveExists(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(res.archive).toBe(undefined)
  expect(resData.success).toBe(false)
  expect(resData.message).toBe(
    'No archive exists with query = {"_id":"5f336c1de9aea42d24bf0f21"}'
  )
})

//what would happen if an invalid Id is given
test('Test archiveExists Controller: Invalid Id', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    archiveId: 'a',
  }
  const res = httpMocks.createResponse()

  //execute
  await archiveExists(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(res.archive).toBe(undefined)
  expect(resData.success).toBe(false)
  expect(resData.message).toBe(
    'Cast to ObjectId failed for value "a" at path "_id" for model "Archive"'
  )
})

//open and close db connection on start/end of this file
beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await closeConnection()
})
