import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces/index'
import { CatalogModel } from '../models/Catalog'
import { QuestionSetModel } from '../models/QuestionSet'
import { log } from '../utils/logger'

//✔️
const catalogExists = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { catalogId } = req.body
    log({
      message: `Does catalog ${catalogId} exist`,
      type: 'info',
    })
    const catalog = await CatalogModel.findById(catalogId)

    if (!catalog) {
      log({
        message: `${catalogId} false exist`,
        type: 'info',
      }) // @typescript-eslint/no-unused-vars
      return res.status(200).json({
        success: false,
        message: `No catalog with catalogId: ${catalogId}`,
      })
    }

    log({
      message: `${catalogId} true exist`,
      type: 'info',
    })
    res.catalog = catalog
    next()
  }
)
const allCatalogDetails = asyncHandler(async (req: Request, res: Response) => {
  const catalog = await CatalogModel.find({})
  res.status(200).json({
    success: true,
    message: `Catalog found`,
    data: {
      catalog,
    },
  })
})

//✔️
const getCatalogQuestionSet = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const {
      questionSet: questionSetId,
      _id,
    }: { questionSet: any; _id: any } = res.catalog
    log({
      message: `Question set for catalog ${res.catalog._id}`,
      type: 'info',
    })
    const questionSet = await QuestionSetModel.findById(questionSetId)

    if (!questionSet) {
      log({
        message: `No question set for ${res.catalog._id}`,
        type: 'info',
      })
      return res.status(200).json({
        success: false,
        message: `No question set with Id = ${questionSetId} found for catalog ${_id}`,
      })
    }

    res.questionSet = questionSet
    next()
  }
)

export { catalogExists, getCatalogQuestionSet, allCatalogDetails }
