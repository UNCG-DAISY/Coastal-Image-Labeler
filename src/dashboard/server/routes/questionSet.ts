import express from 'express'
import { getQuestionSetKeys } from '@/controllers/questionSet'
import { param } from 'express-validator'
import { bodyValidation } from '@/server/middlewares/bodyValidation'
const router = express.Router()

router
  .route('/keys/:id')
  .get(
    ...bodyValidation([param('id').isString().isMongoId()]),
    getQuestionSetKeys
  )

export default router
