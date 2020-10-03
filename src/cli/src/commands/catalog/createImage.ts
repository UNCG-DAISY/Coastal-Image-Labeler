//function for making images

import { ArchiveDocument } from '../../../interfaces/models'
import { CreateImageReturn } from '../../../interfaces'
interface Params {
  fileName: string
  archiveEntry: ArchiveDocument
  imagePath: string
  catalogPathKeys: string[]
}

export function createImage(params: Params): CreateImageReturn {
  const { fileName, archiveEntry, imagePath, catalogPathKeys } = params

  const imagePaths = {
    original: undefined,
  }
  for (const key of catalogPathKeys) {
    imagePaths[key] = imagePath
  }

  return {
    archive: archiveEntry._id,
    name: fileName,
    path: imagePaths,
    //numberOfMatches: 2,
    taggable: true,
    dateAdded: Date.now(),
  }
}
