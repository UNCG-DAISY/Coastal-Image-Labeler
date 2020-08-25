// import { ArchiveModel } from '../models/Archive'
import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { isValidArchive } from '../utils/checks/isValidArchive'
import { log } from '../utils/logger'

//✔️
const archiveExists = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { archiveId } = req.body

    //check archive is valid ID
    const validArchive = await isValidArchive({ _id: archiveId })
    log({
      message: `Validating archive ${archiveId}`,
      type: 'info',
    })

    if (!validArchive.success) {
      return res.status(200).json({
        success: false,
        message: validArchive.message,
      })
    }

    res.archive = validArchive.data[0]
    next()
  }
)

export { archiveExists }
