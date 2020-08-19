import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import {
  ExtenedResponse,
  AssignedImageTagAggregate,
  AssignedImageTagAggregateArchive,
} from '../../interfaces'
import { Request, NextFunction } from 'express'
import { AssignedImageModel } from '../models/AssignedImages'
import { selectImageForAssignment } from '../utils/selectImageForAssignment'
import { ImageModel } from '../models/Image'
import { TagModel } from '../models/Tag'
import { CatalogModel } from '../models/Catalog'
import { ArchiveModel } from '../models/Archive'
// import { performance } from 'perf_hooks'
import { tagModelAggregate } from '../utils/tagModelAggregate'
import { log } from '../utils/logger'

//✔️
const getCurrentlyAssignedImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { archiveId } = req.body
    const { user } = req

    log({
      message: `Getting current assigned image for user ${user?.data?._id} of archive ${archiveId}`,
      type: 'info',
    })

    //Check if there is already an assigned image
    const currentlyAssignedImage = await AssignedImageModel.findOne({
      userId: user.data._id,
      archiveId: archiveId,
    })

    //If there is a image assigned
    if (currentlyAssignedImage) {
      const image = await ImageModel.findById(currentlyAssignedImage.imageId)
      log({
        message: `Currently assigned image is ${image._id}`,
        type: 'info',
      })

      return res.status(200).json({
        success: true,
        message: 'Got Image',
        data: {
          assignedImage: image,
        },
      })
    }

    next()
  }
)

//✔️
const assignImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    //console.log('Assigning New Image')
    const { archiveId } = req.body
    const { user } = req

    log({
      message: `Assigning image for user ${user?.data?._id} for archive ${archiveId}`,
      type: 'info',
    })

    const selectedImage = await selectImageForAssignment({
      user: user,
      archiveId: archiveId,
    })

    log({
      message: `Selected image ${selectedImage.success}`,
      type: 'info',
    })

    if (selectedImage.success) {
      res.assignedImage = selectedImage.data
      next()
    } else {
      res.status(400).json({
        success: false,
        message: selectedImage.message,
      })
    }
  }
)

//✔️
const unassignImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    console.log('unassigning an Image')
    const { imageId } = req.body
    const { user } = req

    log({
      message: `Unassigning image ${imageId} for user ${user?.data?._id}`,
      type: 'info',
    })

    const currentAssignedImage = await AssignedImageModel.findOne({
      imageId: imageId,
      userId: user.data._id,
    })

    if (currentAssignedImage) {
      log({
        message: `Removing image ${currentAssignedImage._id}`,
        type: 'info',
      })
      await currentAssignedImage.remove()
      return next()
    }

    res.status(500).json({
      success: false,
      message: `Error in unassigning image ${imageId}`,
    })
  }
)

//✔️
const insertTaggedCount = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    //const t1 = performance.now()

    //aggregate
    const AssignedGroupByCatalog = await AssignedImageModel.aggregate([
      {
        $match: {
          userId: req.user.data._id,
        },
      },
      {
        $group: {
          _id: '$catalogId',
          numArchivesAssigned: { $sum: 1 },
          doc: { $push: '$$ROOT' },
        },
      },
    ])
    log({
      message: `Aggregate Assigned Image mode`,
      type: 'info',
    })
    log({
      message: AssignedGroupByCatalog,
    })

    const dataObj: AssignedImageTagAggregate[] = []

    //For each catalog tagged by the user
    for (const assignedCatalog of AssignedGroupByCatalog) {
      const catalog: AssignedImageTagAggregate = {}
      const doc = await CatalogModel.findById(assignedCatalog._id)

      catalog.catalogInfo = doc.catalogInfo
      catalog.totalImages = doc.totalImages
      catalog.name = doc.name
      catalog.catalogId = doc._id

      //get how many images tagged of this catalog
      catalog.tagged =
        (
          await tagModelAggregate({
            userId: req.user.data._id,
            catalogId: doc._id,
          })
        )[0]?.numTagsInCatalog ?? 0

      catalog.archives = []

      //for each archive,find how many images tagged per archive
      for (const archive of assignedCatalog.doc) {
        const archiveData: AssignedImageTagAggregateArchive = {
          _id: archive.archiveId,
        }

        //count tagged
        archiveData.tagged = (
          await TagModel.find({
            userId: req.user.data._id,
            archiveId: archive.archiveId,
          })
        ).length

        //insert archive info
        const archiveDoc = await ArchiveModel.findById(archive.archiveId)
        archiveData.name = archiveDoc?.name
        archiveData.totalImages = archiveDoc?.totalImages

        catalog.archives.push(archiveData)
      }

      dataObj.push(catalog)
    }

    res.taggedCount = dataObj ?? []
    // const t2 = performance.now()
    // console.log(`Server: Time ${t2 - t1} ms`)
    next()
  }
)

export {
  getCurrentlyAssignedImage,
  insertTaggedCount,
  assignImage,
  unassignImage,
}
