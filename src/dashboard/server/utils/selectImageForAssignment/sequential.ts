import { ImageModel } from '../../models/Image'
// import { TagModel } from "../../models/Tag"
import { AssignedImageModel } from '../../models/AssignedImages'
// import { log } from "../logger"
// import { ObjectID } from "mongodb"
import {
  ImageServeOrderDocument,
  ArchiveDocument,
  TagDocument,
} from '../../../interfaces/models'

interface Params {
  archive: ArchiveDocument
  imagesTaggedByUser: TagDocument[]
  user: Express.User
  imageServeOrder: ImageServeOrderDocument
}

async function SequentialOrder(params: Params) {
  const { archive, imagesTaggedByUser, imageServeOrder, user } = params

  //first get the order for the archive
  const orderOfArchive = imageServeOrder?.data[archive.name]
  if (!orderOfArchive) {
    return {
      success: false,
      message: 'No order for archive',
    }
  }

  let firstNonTaggedImage = undefined
  //Find the first image in the order that is not tagged
  for (const orderdImage of orderOfArchive) {
    let isImageTagged = false
    for (const taggedImage of imagesTaggedByUser) {
      const image = await ImageModel.findById(taggedImage.imageId)
      if (image.name === orderdImage) {
        isImageTagged = true
      }
    }
    if (!isImageTagged) {
      firstNonTaggedImage = orderdImage
      break
    }
  }

  if (firstNonTaggedImage) {
    const selectedImageDocument = await ImageModel.findOne({
      name: firstNonTaggedImage,
    })
    await AssignedImageModel.create({
      date: Date.now(),
      imageId: selectedImageDocument._id,
      userId: user.data._id,
      archiveId: archive._id,
    })

    return {
      success: true,
      message: `Found image to assign with id = ${selectedImageDocument._id}`,
      data: selectedImageDocument,
    }
  }

  return {
    success: false,
    message: `No more images to tag in archive ${archive._id}`,
  }
}

export { SequentialOrder }
