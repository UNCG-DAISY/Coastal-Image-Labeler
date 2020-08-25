import httpMocks from 'node-mocks-http'
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
import { UserModel } from '../../server/models/User'
import { hasAssignedImages, getUser } from '../../server/controllers/user'
beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await closeConnection()
})

test('Test user has Assigned Image', async () => {
  //create mocks
  const req = httpMocks.createRequest()

  const userData = await UserModel.findById('5f2f65cd363ae5001670164b')
  req.user = {
    displayName: 'Shah Nafis Rafique',
    id: '',
    nickname: '',
    picture: '',
    provider: '',
    user_id: '',
    data: userData,
  }
  const res = httpMocks.createResponse()

  //execute
  await hasAssignedImages(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(resData.success).toBe(true)
  expect(resData.message).toBe('User has assigned images')
})

test('Test getUser', async () => {
  //create mocks
  const req = httpMocks.createRequest()

  const userData = await UserModel.findById('5f2f65cd363ae5001670164b')
  req.user = {
    displayName: 'Shah Nafis Rafique',
    id: 'google-oauth2|116302372331153157667',
    nickname: '',
    picture: '',
    provider: '',
    user_id: '',
    data: userData,
  }
  const res = httpMocks.createResponse()

  //execute
  await getUser(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(resData.success).toBe(true)
  expect(resData.message).toBe('User found')
  expect(resData.data).toStrictEqual({
    user: {
      catalogs: ['5f336c1de9aea42d24bf0f21'],
      dateAdded: '2020-08-09T02:56:13.591Z',
      roles: ['tagger', 'admin'],
      _id: '5f2f65cd363ae5001670164b',
      userId: 'google-oauth2|116302372331153157667',
      userName: 'Nafis Shah',
      __v: 0,
      id: '5f2f65cd363ae5001670164b',
    },
  })
})
