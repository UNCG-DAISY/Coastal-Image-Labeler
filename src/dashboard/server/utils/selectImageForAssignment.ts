import { CatalogModel } from '../models/Catalog'
import { ArchiveModel } from '../models/Archive'
import { ImageServeOrderModel } from '../models/ImageServeOrder'
import { ImageModel } from '../models/Image'
import { TagModel } from '../models/Tag'
import { AssignedImageModel } from '../models/AssignedImages'
import { ImageDocument } from '../../interfaces/models'
import { log } from './logger'

interface Params {
  user: Express.User
  archiveId: any
}
interface ReturnType {
  success: boolean
  message: string
  data?: ImageDocument
}

async function selectImageForAssignment({
  user,
  archiveId,
}: Params): Promise<ReturnType> {
  log({
    message: `Selecting image for assignment for user ${user.data._id} for archive ${archiveId}`,
    type: 'info',
  })
  const archive = await ArchiveModel.findById(archiveId)
  const catalog = await CatalogModel.findById(archive.catalog)
  const imageServeOrder = await ImageServeOrderModel.findById(
    catalog.imageServeOrder.toString()
  )

  //Get all images tagged by the user
  const imagesTaggedByUser = await TagModel.find({
    userId: user.data._id,
  })

  const taggedImageIdOnly = imagesTaggedByUser.map((imageTag) =>
    imageTag.imageId.toString()
  )

  log({
    message: `Serve order = ${imageServeOrder.type} for catalog ${catalog._id} with server order doc = ${imageServeOrder._id}`,
    type: 'info',
  })
  if (imageServeOrder.type === 'random') {
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

  log({
    message: `No image serve order found for catalog ${catalog._id} of archive ${archiveId}`,
    type: 'info',
  })
  return {
    success: false,
    message: 'No Image serve order found',
  }
}

export { selectImageForAssignment }
