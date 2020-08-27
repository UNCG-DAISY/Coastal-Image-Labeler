import { ImageModel } from '../../models/Image'
import { AssignedImageModel } from '../../models/AssignedImages'
import { log } from '../logger'
import {
  ImageServeOrderDocument,
  ArchiveDocument,
  TagDocument,
} from '../../../interfaces/models'
import { RandomOrder } from './random'

interface Params {
  archive: ArchiveDocument
  imagesTaggedByUser: TagDocument[]
  taggedImageIdOnly: string[]
  user: Express.User
  imageServeOrder: ImageServeOrderDocument
}

async function SequentialOrder(params: Params) {
  const {
    archive,
    imagesTaggedByUser,
    imageServeOrder,
    user,
    taggedImageIdOnly,
  } = params

  //first get the order for the archive
  const orderOfArchive = imageServeOrder?.data[archive.name]
  if (!orderOfArchive) {
    log({
      type: 'error',
      message: `No serve order found for archive ${archive.name} at serve order ${imageServeOrder._id}: Defaulting to random assignment`,
    })
    log({
      type: 'info',
      message: `Trying random serve`,
    })
    return await RandomOrder({
      archiveId: archive._id,
      taggedImageIdOnly: taggedImageIdOnly,
      user: user,
    })
  }

  let firstNonTaggedImage = undefined
  //Find the first image in the order that is not tagged
  for (const orderdImage of orderOfArchive) {
    const orderdImageTagged = !!imagesTaggedByUser.find((element) => {
      return element.image.name === orderdImage
    })
    if (!orderdImageTagged) {
      firstNonTaggedImage = orderdImage
      break
    }
  }

  //If there is a taggable image
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

  //if no taggable image
  return {
    success: false,
    message: `No more images to tag in archive ${archive._id}`,
  }
}

export { SequentialOrder }
