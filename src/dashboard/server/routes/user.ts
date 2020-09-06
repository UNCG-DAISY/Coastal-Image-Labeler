import express from 'express'
import { getUser, hasAssignedImages } from '@/server/controllers/user'

import { ensureAuthenticated } from '@/server/middlewares/ensureAuth'
import { insertUser } from '@/server/middlewares/insertUser'
const router = express.Router()

//✔️
router.route('/getUser').post(ensureAuthenticated, getUser)

//✔️
router
  .route('/hasAssignedImages')
  .post(ensureAuthenticated, insertUser, hasAssignedImages)

export default router
