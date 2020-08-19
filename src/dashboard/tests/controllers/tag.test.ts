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
// import mongoose  from 'mongoose'

import { tagImage } from '../../server/controllers/tags'
import { UserModel } from '../../server/models/User'
import { TagModel } from '../../server/models/Tag'
import { ImageModel } from '../../server/models/Image'

import { compareTags } from '../../server/utils/compareTags'
beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await TagModel.deleteMany({})
  await ImageModel.updateOne(
    { _id: '5f336c1de9aea42d24bf0f23' },
    {
      finalTag: undefined,
      taggable: true,
    }
  )

  await closeConnection()
})

test('Test tagImage Controller: Valid Id', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    userId: '5f2f65cd363ae5001670164b',
    imageId: '5f336c1de9aea42d24bf0f23',
    tags: {
      tankFeatures: ['highCaliber', 'heavyArmor', 'highViewRange'],
      equipmentTypes: ['coaxMg', 'turretMg'],
      'Additional Comments': 'tier 10',
      tankClass: 'heavy',
    },
  }
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
  await tagImage(req, res, () => {
    return
  })
  //const resData = res._isJSON()? res._getJSONData(): undefined

  //assert
  expect(res.newTag.userId.toString()).toBe('5f2f65cd363ae5001670164b')
  expect(res.newTag.imageId.toString()).toBe('5f336c1de9aea42d24bf0f23')
  expect(res.newTag.archiveId.toString()).toBe('5f336c1de9aea42d24bf0f22')
  expect(res.newTag.catalogId.toString()).toBe('5f336c1de9aea42d24bf0f21')
  expect(res.newTag.tags).toStrictEqual({
    tankFeatures: ['highCaliber', 'heavyArmor', 'highViewRange'],
    equipmentTypes: ['coaxMg', 'turretMg'],
    'Additional Comments': 'tier 10',
    tankClass: 'heavy',
  })
  expect(res.newTag.final).toBe(false)

  //cleanup
  //await res.newTag.remove()
})

test('Test tagImage Controller: Tag twice', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    userId: '5f2f65cd363ae5001670164b',
    imageId: '5f336c1de9aea42d24bf0f23',
    tags: {
      tankFeatures: ['highCaliber', 'heavyArmor', 'highViewRange'],
      equipmentTypes: ['coaxMg', 'turretMg'],
      'Additional Comments': 'tier 10',
      tankClass: 'heavy',
    },
  }
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
  await tagImage(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(resData.success).toBe(false)
  expect(resData.message).toBe(
    'User 5f2f65cd363ae5001670164b has already tagged image 5f336c1de9aea42d24bf0f23'
  )
  expect(res.newTag).toBe(undefined)
})

test('Test tagImage Controller: Finalized', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    userId: '5f39cf33e0ceea4f6c11c046',
    imageId: '5f336c1de9aea42d24bf0f23',
    tags: {
      tankFeatures: ['highCaliber', 'heavyArmor', 'highViewRange'],
      equipmentTypes: ['coaxMg', 'turretMg'],
      'Additional Comments': 'tier 10',
      tankClass: 'heavy',
    },
  }
  const userData = await UserModel.findById('5f39cf33e0ceea4f6c11c046')
  req.user = {
    displayName: '',
    id: '',
    nickname: '',
    picture: '',
    provider: '',
    user_id: '',
    data: userData,
  }
  const res = httpMocks.createResponse()

  //execute
  await tagImage(req, res, () => {
    return
  })
  const image = await ImageModel.findById('5f336c1de9aea42d24bf0f23')

  //assert
  expect(res.newTag.userId.toString()).toBe('5f39cf33e0ceea4f6c11c046')
  expect(res.newTag.imageId.toString()).toBe('5f336c1de9aea42d24bf0f23')
  expect(res.newTag.archiveId.toString()).toBe('5f336c1de9aea42d24bf0f22')
  expect(res.newTag.catalogId.toString()).toBe('5f336c1de9aea42d24bf0f21')
  expect(res.newTag.tags).toStrictEqual({
    tankFeatures: ['highCaliber', 'heavyArmor', 'highViewRange'],
    equipmentTypes: ['coaxMg', 'turretMg'],
    'Additional Comments': 'tier 10',
    tankClass: 'heavy',
  })
  expect(res.newTag.final).toBe(true)
  expect(image.finalTag.toString()).toBe(res.newTag._id.toString())
})

test('Test compareTags: Same', async () => {
  const tag1 = {
    field1: 'test1',
    field2: {
      field3: 'test2',
    },
    comments: '',
  }
  const tag2 = {
    field2: {
      field3: 'test2',
    },
    comments: '',
    field1: 'test1',
  }

  const result = await compareTags(tag1, tag2, ['comments'])
  expect(result).toBe(true)
})

test('Test compareTags: Different', async () => {
  const tag1 = {
    field1: 'test1',
    comments: '',
  }
  const tag2 = {
    field2: {
      field3: 'test2',
    },
    comments: '',
    field1: 'test1',
  }

  const result = await compareTags(tag1, tag2, ['comments'])
  expect(result).toBe(false)
})
