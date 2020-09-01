import { Request, Response, NextFunction } from 'express'
import { log } from '../utils/logger'
import { asyncHandler } from './async'

function hasRoles(roles: string[]) {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let success = true
      const failedRoles = []
      const userRoles = req?.user?.data?.roles ?? []

      log({
        type: 'info',
        message: `Matching user ${req.user.id} roles of [${userRoles}] which must have [${roles}]`,
      })

      for (const role of roles) {
        success = success && userRoles.includes(role)
        if (!userRoles.includes(role)) {
          failedRoles.push(role)
        }
      }

      if (success) {
        next()
      } else {
        res.status(401).json({
          success: false,
          message: `User does not have roles ${failedRoles.toString()}`,
        })
      }
    }
  )
}

export { hasRoles }
