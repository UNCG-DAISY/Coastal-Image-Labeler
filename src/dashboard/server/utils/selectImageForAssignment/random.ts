import { ImageModel } from '../../models/Image'
import { AssignedImageModel } from '../../models/AssignedImages'
import { log } from '../logger'
import { ObjectID } from 'mongodb'

interface Params {
  archiveId: ObjectID | string
  taggedImageIdOnly: string[]
  user: Express.User
}

async function RandomOrder(params: Params) {
  const { archiveId, taggedImageIdOnly, user } = params
  //Get all the images that can be tagged
  const allTaggableImages = await ImageModel.find({
    taggable: true,
    archive: archiveId,
  })
  const taggableImagesIdOnly = allTaggableImages.map((image) =>
    image._id.toString()
  )

  //Filter to only those that have not been tagged by user
  const taggableImages = taggableImagesIdOnly.filter(
    (imageId) => !taggedImageIdOnly.includes(imageId)
  )

  // console.log('All taggable Images', taggableImagesIdOnly)
  // console.log('Tagged images', taggedImageIdOnly)
  // console.log('Filtered Images', taggableImages)
  log({
    message: `# of taggable images = ${taggableImagesIdOnly.length}, # of Tagged images by user ${user.data._id} = ${taggedImageIdOnly.length}, # of Taggable images for user = ${taggableImages.length}`,
    type: 'info',
  })

  //if there are taggable images
  if (taggableImages.length > 0) {
    const selectedId =
      taggableImages[Math.floor(Math.random() * taggableImages.length)]
    const selectedImageDocument = await ImageModel.findById(selectedId)

    await AssignedImageModel.create({
      date: Date.now(),
      imageId: selectedId,
      userId: user.data._id,
      archiveId: archiveId,
    })

    log({
      message: `Selected image for assignment is id = ${selectedId} of archive = ${archiveId} for user ${user.data._id}`,
      type: 'info',
    })
    return {
      success: true,
      message: `Found image to assign with id = ${selectedImageDocument._id}`,
      data: selectedImageDocument,
    }
  } else {
    log({
      message: `No more images to tag for archive = ${archiveId} for user ${user.data._id}`,
      type: 'info',
    })
    return {
      success: false,
      message: `No more images to tag in archive ${archiveId}`,
    }
  }
}

export { RandomOrder }
