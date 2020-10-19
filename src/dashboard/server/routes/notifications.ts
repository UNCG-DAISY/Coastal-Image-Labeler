import express from 'express'
import { getNotifications } from '../controllers/notifications'

const router = express.Router()

//✔️
router.route('/').get(getNotifications)

export default router
