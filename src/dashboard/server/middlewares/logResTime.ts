import { Request, Response, NextFunction } from 'express'
import { log } from '@/server/utils/logger'
function displayResponseTime(req: Request, res: Response, next: NextFunction) {
  const startHrTime = process.hrtime()

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime)
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6

    const regex = /\/api\/.*/
    const regexResult = req.baseUrl.match(regex)
    const isApiCall = !(regexResult === null)

    if (process.env.NEXT_PUBLIC_Time_Nextjs_Calls === 'true' || isApiCall) {
      console.log()
      log({
        type: 'time',
        message: `Path: ${req.originalUrl.split(' ')[0]} ${elapsedTimeInMs}ms`,
      })
    }
  })

  next()
}

export { displayResponseTime }
