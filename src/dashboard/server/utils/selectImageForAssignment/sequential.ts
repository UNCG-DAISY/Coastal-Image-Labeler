import { ImageModel } from '@/server/models/Image'
import { AssignedImageModel } from '@/server/models/AssignedImages'
import { log } from '@/server/utils/logger'
import {
  ArchiveDocument,
  TagDocument,
  CatalogDocument,
} from '@/interfaces/models'
import { RandomOrder } from './random'

interface Params {
  archive: ArchiveDocument
  imagesTaggedByUser: TagDocument[]
  taggedImageIdOnly: string[]
  user: Express.User
  catalog: CatalogDocument
}

async function SequentialOrder(params: Params) {
  const {
    archive,
    catalog,
    user,
    imagesTaggedByUser,
    taggedImageIdOnly,
  } = params
  const imageServeOrder = catalog.imageServeOrder

  //first get the order of the images for the archive
  const orderOfArchive = imageServeOrder?.data[archive.name]
  if (!orderOfArchive) {
    log({
      type: 'error',
      message: `No serve order found for archive ${archive.name}: Defaulting to random assignment`,
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
    //For each image in the order, find it in the tagged images
    //!! means conver to boolean, True if it is already tagged, false if it isnt
    const orderdImageTagged = !!imagesTaggedByUser.find((element) => {
      return element?.image?.name === orderdImage
    })

    //If the image is not tagged, this is the image we will serve
    if (!orderdImageTagged) {
      firstNonTaggedImage = orderdImage
      break
    }
  }

  //If there is a taggable image
  if (firstNonTaggedImage) {
    //get the image document
    const selectedImageDocument = await ImageModel.findOne({
      name: firstNonTaggedImage,
    })

    //assign image
    await AssignedImageModel.create({
      date: Date.now(),
      imageId: selectedImageDocument._id,
      userId: user.data._id,
      archiveId: archive._id,
    })

    //return assigned image
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
