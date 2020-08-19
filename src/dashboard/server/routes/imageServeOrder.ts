import express from 'express'
import { genericReturn } from '../middlewares/genericReturn'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { ImageServeOrderModel } from '../models/ImageServeOrder'

const router = express.Router()

//✔️
router.route('/').post(
  advancedResults(ImageServeOrderModel),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

export default router
