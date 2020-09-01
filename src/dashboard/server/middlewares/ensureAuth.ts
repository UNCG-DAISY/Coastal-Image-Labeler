import { Request, Response, NextFunction } from 'express'
import { log } from '../utils/logger'

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    log({
      message: `Authed user ${req.user.id}`,
      type: 'ok',
    })
    return next()
  }

  res.status(401).json({
    success: false,
    message: `Not authenticated`,
  })
}

export { ensureAuthenticated }
