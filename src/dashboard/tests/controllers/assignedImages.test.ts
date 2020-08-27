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
import { tagImage } from '../../server/controllers/tags'
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
    displayName: 'User 1',
    id: 'userId1',
    nickname: '',
    picture: '',
    provider: '',
    user_id: '',
    data: userData,
  }
  req.body = {
    archiveId: '5f480547ec0ae87524919948',
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
        original: '/assignedImage.jpg',
        compressed: '/assignedImage.jpg',
      },
      _id: '5f336c1ee9aea42d24bf0f33',
      archive: '5f480547ec0ae87524919948',
      name: 'assignedImage.jpg',
      taggable: true,
      dateAdded: '2020-08-12T04:12:14.639Z',
      __v: 0,
      id: '5f336c1ee9aea42d24bf0f33',
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
    archiveId: '5f336c1fe9aea42d24bf0f39',
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
    archiveId: '5f336c1ee9aea42d24bf0f2a',
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
    '5f336c1ee9aea42d24bf0f2a'
  )
  const assignedImageObj = await AssignedImageModel.findOne({
    userId: '5f2f65cd363ae5001670164b',
    archiveId: '5f336c1ee9aea42d24bf0f2a',
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
  expect(res.taggedCount[0].totalImages).toBe(8)
  expect(res.taggedCount[0].name).toBe('Catalog 1')
  expect(res.taggedCount[0].catalogId.toString()).toBe(
    '5f336c1de9aea42d24bf0f21'
  )
  expect(res.taggedCount[0].archives.length).toBe(1)
})

test('Test assignImage sequential order', async () => {
  //create mocks
  const reqAssign = httpMocks.createRequest()
  const userData = await UserModel.findById('5f2f65cd363ae5001670164b')
  const user = {
    displayName: 'User 1',
    id: 'userId1',
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

  //execute: Get assigned image
  await assignImage(reqAssign, resAssign, () => {
    return
  })

  //assert
  expect(resAssign.assignedImage.archive.toString()).toBe(
    '5f336c1ee9aea42d24bf0f31'
  )
  expect(resAssign.assignedImage.name).toBe('ordered1.jpg')

  //execute: Tag image
  const reqTag = httpMocks.createRequest()
  reqTag.body = {
    userId: '5f2f65cd363ae5001670164b',
    imageId: resAssign.assignedImage._id,
    tags: {
      imageFeatures: ['field1', 'field2', 'field13'],
      otherFeatures: ['other1', 'other2'],
      'Additional Comments': 'Hello Word',
      isImage: true,
      classType: 'class1',
    },
  }
  reqTag.user = user
  const resTag = httpMocks.createResponse()
  await tagImage(reqTag, resTag, () => {
    return
  })
  //asset: tagged
  expect(resTag.newTag.userId.toString()).toBe('5f2f65cd363ae5001670164b')
  expect(resTag.newTag.imageId.toString()).toBe(
    resAssign.assignedImage._id.toString()
  )
  expect(resTag.newTag.archiveId.toString()).toBe('5f336c1ee9aea42d24bf0f31')
  expect(resTag.newTag.catalogId.toString()).toBe('5f336c1de9aea42d24bf0f21')
  expect(resTag.newTag.tags).toStrictEqual({
    imageFeatures: ['field1', 'field2', 'field13'],
    otherFeatures: ['other1', 'other2'],
    'Additional Comments': 'Hello Word',
    isImage: true,
    classType: 'class1',
  })

  //execute: get new image
  const reqAssign2 = httpMocks.createRequest()
  reqAssign2.user = user
  reqAssign2.body = {
    archiveId: '5f336c1ee9aea42d24bf0f31',
  }
  const resAssign2 = httpMocks.createResponse()

  //execute: Get assigned image
  await assignImage(reqAssign2, resAssign2, () => {
    return
  })

  //assert
  expect(resAssign2.assignedImage.archive.toString()).toBe(
    '5f336c1ee9aea42d24bf0f31'
  )
  expect(resAssign2.assignedImage.name).toBe('ordered2.jpg')
})

test('x', async () => {
  expect(1).toBe(1)
})
