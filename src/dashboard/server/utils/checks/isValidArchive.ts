import { ArchiveModel } from '../../models/Archive'
import { log } from '../logger'

interface Param {
  _id?: string
  totalImages?: number
  name?: string
  catalog?: string
  taggable?: boolean
  dateAddded?: number | Date
  path?: {
    compressed: string
    original: string
  }
}

export async function isValidArchive(query: Param) {
  log({
    message: `Checking if valid archive: ${JSON.stringify(query)}`,
    type: 'info',
  })
  try {
    const archive = await ArchiveModel.find(query)

    log({
      message: `Found valid archives: ${archive.length}`,
      type: 'ok',
    })

    if (archive.length > 0) {
      return {
        success: true,
        data: archive,
      }
    } else {
      return {
        success: false,
        message: `No archive exists with query = ${JSON.stringify(query)}`,
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}
