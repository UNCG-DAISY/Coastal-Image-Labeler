import express from 'express'
import { genericReturn } from '../middlewares/genericReturn'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { ImageModel } from '../models/Image'

const router = express.Router()

//✔️
router.route('/').post(
  advancedResults(ImageModel),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

export default router
