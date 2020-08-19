import express from 'express'
import { getUser, hasAssignedImages } from '../controllers/user'

import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { insertUser } from '../middlewares/insertUser'
const router = express.Router()

//✔️
router.route('/getUser').post(ensureAuthenticated, getUser)

//✔️
router
  .route('/hasAssignedImages')
  .post(ensureAuthenticated, insertUser, hasAssignedImages)

export default router
