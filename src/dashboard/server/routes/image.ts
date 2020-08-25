import express from 'express'
import { genericReturn } from '../middlewares/genericReturn'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'
import { ImageModel } from '../models/Image'
import { showImage } from '../middlewares/showImage'
import { param } from 'express-validator'
import { bodyValidation } from '../middlewares/bodyValidation'
import { getImagePath } from '../controllers/image'
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

router
  .route('/show/compressed/:imageId')
  .get(
    ...bodyValidation([param('imageId').isString()]),
    getImagePath({ imagePath: 'Compressed' }),
    showImage
  )

router
  .route('/show/original/:imageId')
  .get(
    ...bodyValidation([param('imageId').isString()]),
    getImagePath({ imagePath: 'Original' }),
    showImage
  )

export default router
