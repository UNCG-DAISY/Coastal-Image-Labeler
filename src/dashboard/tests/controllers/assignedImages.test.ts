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
import {
  getCurrentlyAssignedImage,
  assignImage,
  unassignImage,
  insertTaggedCount,
} from '../../server/controllers/assignedImages'
import { AssignedImageModel } from '../../server/models/AssignedImages'
beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await closeConnection()
})

test('Test getCurrentlyAssignedImage: Already assigned image', async () => {
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
  req.body = {
    archiveId: '5f336c1de9aea42d24bf0f22',
  }
  const res = httpMocks.createResponse()

  //execute
  await getCurrentlyAssignedImage(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(resData.success).toBe(true)
  expect(resData.message).toBe('Got Image')
  expect(resData.data).toStrictEqual({
    assignedImage: {
      path: {
        original: '/m1a2_abrams.jpg',
        compressed: '/m1a2_abrams.jpg',
      },
      _id: '5f336c1de9aea42d24bf0f23',
      archive: '5f336c1de9aea42d24bf0f22',
      name: 'm1a2_abrams.jpg',
      numberOfMatches: 2,
      taggable: true,
      dateAdded: '2020-08-12T04:12:13.441Z',
      __v: 0,
      finalTag: null,
      id: '5f336c1de9aea42d24bf0f23',
    },
  })
})

test('Test getCurrentlyAssignedImage: No assigned image', async () => {
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
  req.body = {
    archiveId: '5f336c1de9aea42d24bf0f21',
  }
  const res = httpMocks.createResponse()

  //execute
  await getCurrentlyAssignedImage(req, res, () => {
    return
  })
  const resData = res._isJSON()

  //assert
  expect(resData).toBe(false)
})

test('Test assignImage and unassignImage', async () => {
  //create mocks
  const reqAssign = httpMocks.createRequest()
  const userData = await UserModel.findById('5f2f65cd363ae5001670164b')
  const user = {
    displayName: 'Shah Nafis Rafique',
    id: 'google-oauth2|116302372331153157667',
    nickname: '',
    picture: '',
    provider: '',
    user_id: '',
    data: userData,
  }
  const body = {
    archiveId: '5f336c1ee9aea42d24bf0f31',
  }
  reqAssign.user = user
  reqAssign.body = body
  const resAssign = httpMocks.createResponse()

  //execute
  await assignImage(reqAssign, resAssign, () => {
    return
  })

  //assert
  expect(resAssign.assignedImage.archive.toString()).toBe(
    '5f336c1ee9aea42d24bf0f31'
  )
  const assignedImageObj = await AssignedImageModel.findOne({
    userId: '5f2f65cd363ae5001670164b',
    archiveId: '5f336c1ee9aea42d24bf0f31',
  })
  expect(resAssign.assignedImage._id.toString()).toBe(
    assignedImageObj.imageId.toString()
  )

  //Unassign
  const reqUnassign = httpMocks.createRequest()
  const unassignBody = {
    imageId: resAssign.assignedImage._id.toString(),
  }
  reqUnassign.user = user
  reqUnassign.body = unassignBody
  const resUnassign = httpMocks.createResponse()
  let nextFncCalled = false
  await unassignImage(reqUnassign, resUnassign, () => {
    nextFncCalled = true
    return
  })

  expect(nextFncCalled).toBe(true)
})

test('Test getCurrentlyAssignedImage: Already assigned image', async () => {
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
  await insertTaggedCount(req, res, () => {
    return
  })

  //assert
  expect(res.taggedCount.length).toBe(1)
  expect(res.taggedCount[0].totalImages).toBe(27)
  expect(res.taggedCount[0].name).toBe('Tanks')
  expect(res.taggedCount[0].catalogId.toString()).toBe(
    '5f336c1de9aea42d24bf0f21'
  )
  expect(res.taggedCount[0].archives.length).toBe(1)
})
