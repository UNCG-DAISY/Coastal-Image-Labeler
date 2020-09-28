import express from 'express'
import { genericReturn } from '@/server/middlewares/genericReturn'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '@/server/middlewares/advancedResults'
import { ImageModel } from '@/server/models/Image'
import { showImage } from '@/server/middlewares/showImage'
import { param } from 'express-validator'
import { bodyValidation } from '@/server/middlewares/bodyValidation'
import { getImage } from '@/server/controllers/image'
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
  .route('/:imageId/:type')
  .get(
    ...bodyValidation([param('imageId').isString(), param('type').isString()]),
    getImage,
    showImage
  )

router
  .route('/:imageId')
  .get(...bodyValidation([param('imageId').isString()]), getImage, showImage)

export default router
