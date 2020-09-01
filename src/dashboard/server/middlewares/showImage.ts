import { Request } from 'express'
import { log } from '../utils/logger'
import { ExtenedResponse } from '../../interfaces/index'

async function showImage(req: Request, res: ExtenedResponse) {
  const { imagePath } = res

  log({
    message: `Looking for image with path ${imagePath}`,
    type: 'info',
  })

  try {
    res.sendFile(imagePath)
  } catch (error) {
    log({
      message: `Sending Error image`,
      type: 'error',
    })
    res.sendFile(process.env.NEXT_PUBLIC_Error_Image)
  }
}

export { showImage }
