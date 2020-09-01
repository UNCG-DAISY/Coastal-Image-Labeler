import { asyncHandler } from '../middlewares/async'
import { UserModel } from '../models/User'
import { Request, Response } from 'express'
import { AssignedImageModel } from '../models/AssignedImages'
import { log } from '../utils/logger'

//✔️
const getUser = asyncHandler(async (req: Request, res: Response) => {
  const id: string = req.user.id
  const user = await UserModel.findOne({ userId: id ?? '' })

  if (user) {
    log({
      message: `Got user ${id}`,
      type: 'ok',
    })

    res.status(200).json({
      success: true,
      message: `User found`,
      data: {
        user,
      },
    })
  } else {
    log({
      message: `Not found user ${id}`,
      type: 'error',
    })

    res.status(200).json({
      success: false,
      message: `User not found`,
    })
  }
})

//✔️
const hasAssignedImages = asyncHandler(async (req: Request, res: Response) => {
  const assignedImages = await AssignedImageModel.find({
    userId: req.user.data._id,
  })

  log({
    message: `User ${
      req.user.data._id
    } has assigned images ${!!assignedImages}`,
    type: 'info',
  })

  res.status(200).json({
    success: true,
    message: `User ${
      assignedImages.length > 0 ? 'has assigned' : 'no assigned'
    } images`,
    data: assignedImages.length > 0 ? assignedImages : [],
  })
})

export { getUser, hasAssignedImages }
