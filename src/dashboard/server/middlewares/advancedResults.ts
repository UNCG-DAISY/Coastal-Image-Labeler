/*
    This function provides for pagination and filtering based of query
    parameters and also does reverse virtuals population. For example for
    getting all storms this function limits the number of returned entires by
    15, or by some value passed in the api url or if reverse ordering is needed.
*/

import { Request, NextFunction } from 'express'
import { AllDocuments } from '../../interfaces/models'
import { ExtenedResponse } from '../../interfaces'
import { DocumentQuery, Model } from 'mongoose'

const advancedResults = (
  model: Model<AllDocuments>,
  populate: string[] = []
) => async (req: Request, res: ExtenedResponse, next: NextFunction) => {
  let query: DocumentQuery<AllDocuments[], AllDocuments, {}>

  //Copy req.query
  const reqQuery = { ...req?.query }

  //Fields to exclude for filtering
  const removeFields = ['select', 'sort', 'page', 'limit']

  //Loop over removeFields and delete them from request querry
  removeFields.forEach((param) => delete reqQuery[param])

  // Create operators like %gt,$gte, etc
  let queryString: string = JSON.stringify(reqQuery)
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  )

  //Finding resource
  query = model.find(JSON.parse(queryString))

  // Select fields
  if (req?.query?.select) {
    const fields = (req.query.select as string).split(',').join(' ')
    query = query.select(fields)
  }

  //Sort
  if (req?.query?.sort) {
    const sortBy = (req.query.sort as string).split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    //Default sort by date
    query = query.sort('-dateAdded')
  }

  //Pagination
  const page: number = parseInt((req.query.page as string) ?? '1', 10)
  const limit: number = parseInt((req.query.limit as string) ?? '15', 10)
  const startIndex: number = (page - 1) * limit
  const endIndex: number = page * limit
  const totalDocs: number = await model.countDocuments()

  query = query.skip(startIndex).limit(limit)

  //If there is a populate field
  if (populate?.length > 0) {
    for (const pop of populate) {
      query = query.populate(pop)
    }
  }

  //Executing query
  const queryResult = await query

  //Pagination result
  const pagination: any = {}

  //Show next page
  if (endIndex < totalDocs) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  //Show prev page
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  //Create the advResults property
  res.advancedResults = {
    success: true,
    message: 'Advanced query complete',
    count: queryResult.length,
    pagination: pagination,
    data: queryResult,
  }

  next()
}

export { advancedResults }
