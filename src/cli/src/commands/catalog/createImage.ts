//import { ImageModel } from '../../models/Image'
import { ArchiveDocument } from '../../../interfaces/models'
import { CreateImageReturn } from '../../../interfaces'

interface Params {
  fileName: string
  archiveEntry: ArchiveDocument
  imagePath: string
}

export function createImage(params: Params): CreateImageReturn {
  const { fileName, archiveEntry, imagePath } = params
  return {
    archive: archiveEntry._id,
    name: fileName,
    path: {
      original: imagePath,
      compressed: imagePath,
    },
    //numberOfMatches: 2,
    taggable: true,
    dateAdded: Date.now(),
  }
}
