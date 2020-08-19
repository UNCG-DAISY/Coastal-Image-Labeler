import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/User'
import { log } from '../utils/logger'

async function insertUser(req: Request, res: Response, next: NextFunction) {
  const id: string = req.user.id
  const user = await UserModel.findOne({ userId: id ?? '' })
  if (user) {
    log({
      message: `Inserting user ${id}`,
      type: 'ok',
    })
    req.user.data = user
    return next()
  }

  log({
    message: `No user with userId = ${id}`,
    type: 'error',
  })
  res.status(401).json({
    success: false,
    message: `No User found with id:${id}`,
  })
}

export { insertUser }
