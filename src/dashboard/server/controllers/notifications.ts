// import { ArchiveModel } from '../models/Archive'
import { asyncHandler } from '@/middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '@/interfaces/index'
import { Request } from 'express'
import { NotificationModel } from '@/models/Notification'
import { log } from '@/utils/logger'

//✔️
const getNotifications = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const notifications =
      (await NotificationModel.find({}).sort({ dateAdded: -1 })) ?? []

    log({
      message: `Got ${notifications.length} notifications`,
      type: notifications ? 'ok' : 'error',
    })

    res.status(200).json({
      success: true,
      message: `Got ${notifications.length} notifications`,
      data: {
        notifications: notifications,
      },
    })
  }
)

export { getNotifications }
