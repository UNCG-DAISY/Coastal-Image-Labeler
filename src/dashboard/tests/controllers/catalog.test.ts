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
import {
  catalogExists,
  getCatalogQuestionSet,
} from '../../server/controllers/catalogs'
import { CatalogModel } from '../../server/models/Catalog'
import { filterUserCatalogsMiddleware } from '../../server/middlewares/filter/catalog/filterUserCatalogs'
import { membershipCatalogMiddleware } from '../../server/middlewares/membership/catalog'
import { UserModel } from '../../server/models/User'

test('Test catalogExists Controller: Valid Id', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f21',
  }
  const res = httpMocks.createResponse()

  //execute
  await catalogExists(req, res, () => {
    return
  })

  //assert
  expect(res.catalog.name).toBe('Tanks')
  expect(res.catalog.totalImages).toBe(27)
  expect(res.catalog.catalogInfo.year).toBe(1916)
  expect(res.catalog.questionSet.toString()).toBe('5f36cee346891c0348c77d24')
  expect(res.catalog.imageServeOrder.toString()).toBe(
    '5f3197417264d3213420c20e'
  )
})

test('Test catalogExists Controller: Nonexistant Catalog', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f20',
  }
  const res = httpMocks.createResponse()

  //execute
  await catalogExists(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(resData.success).toBe(false)
  expect(resData.message).toBe(
    'No catalog with catalogId: 5f336c1de9aea42d24bf0f20'
  )
  expect(res.catalog).toBe(undefined)
})

test('Test getCatalogQuestionSet Controller: Valid Id', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f22',
  }
  const res = httpMocks.createResponse()
  res.catalog = await CatalogModel.findById('5f336c1de9aea42d24bf0f21')

  //execute
  await getCatalogQuestionSet(req, res, () => {
    return
  })

  //assert
  expect(res.questionSet.name).toBe('Tank Questions')
  expect(res.questionSet.description).toBe('👋👋👋👋👋👋')
  expect(res.questionSet.questions.length).toBe(4)
})

test('Test getCatalogQuestionSet Controller: Invalid Id', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f22',
  }
  const res = httpMocks.createResponse()
  res.catalog = await CatalogModel.findById('5f336c1de9aea42d24bf0f21')
  res.catalog.questionSet = '5f36cee346891c0348c77d23'
  //execute
  await getCatalogQuestionSet(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(res.questionSet).toBe(undefined)
  expect(resData.success).toBe(false)
  expect(resData.message).toBe(
    'No question set with Id = 5f36cee346891c0348c77d23 found for catalog 5f336c1de9aea42d24bf0f21'
  )
})

test('Test filterUserCatalogsMiddleware Controller', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  const userData = await UserModel.findById('5f2f65cd363ae5001670164b')
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
  const testCatalogs = [...(await CatalogModel.find({}))]
  res.advancedResults = {
    count: 0,
    data: testCatalogs,
    message: '',
    pagination: {
      limit: 0,
      page: 0,
    },
    success: undefined,
  }
  //execute
  await filterUserCatalogsMiddleware(req, res, () => {
    return
  })

  //assert
  expect(res.advancedResults.data.length).toBe(1)
  expect(testCatalogs.length).toBe(2)
})

test('Test catalogExists Controller: Valid Id', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f21',
  }
  const res = httpMocks.createResponse()

  //execute
  await catalogExists(req, res, () => {
    return
  })

  //assert
  expect(res.catalog.name).toBe('Tanks')
  expect(res.catalog.totalImages).toBe(27)
  expect(res.catalog.catalogInfo.year).toBe(1916)
  expect(res.catalog.questionSet.toString()).toBe('5f36cee346891c0348c77d24')
  expect(res.catalog.imageServeOrder.toString()).toBe(
    '5f3197417264d3213420c20e'
  )
})

test('Test membershipCatalogMiddleware Controller: Valid Id', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f336c1de9aea42d24bf0f21',
  }
  const userData = await UserModel.findById('5f2f65cd363ae5001670164b')
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
  await membershipCatalogMiddleware(req, res, () => {
    return
  })

  //assert
  //expect(res.membershipCatalog).toBe(true)
})

test('Test membershipCatalogMiddleware Controller: invalid catalog', async () => {
  //create mocks
  const req = httpMocks.createRequest()
  req.body = {
    catalogId: '5f3b2e7265477a68b819335a',
  }
  const userData = await UserModel.findById('5f2f65cd363ae5001670164b')
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
  await membershipCatalogMiddleware(req, res, () => {
    return
  })
  const resData = res._getJSONData()

  //assert
  expect(res.membershipCatalog).toBe(undefined)
  expect(resData.success).toBe(false)
  expect(resData.message).toBe(
    `User has no membership to catalog Id 5f3b2e7265477a68b819335a`
  )
})

beforeAll(async () => {
  await connectDB()
})

afterAll(async () => {
  await closeConnection()
})
