import { asyncHandler } from '../middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '../../interfaces'
import { Request, NextFunction } from 'express'
import { TagModel } from '../models/Tag'
import { ImageModel } from '../models/Image'
import { imageInCatalog } from '../utils/checks/imageInCatalog'
import { log } from '../utils/logger'
//✔️
const tagImage = asyncHandler(
  async (req: Request, res: ExtenedResponse, next: NextFunction) => {
    const { userId, imageId, tags } = req.body

    log({
      message: `Tagging image ${imageId} by user ${userId}`,
      type: 'info',
    })
    log({
      message: tags,
    })

    //check if user has already tagged this image
    const previousTag = await TagModel.find({
      userId: userId,
      imageId: imageId,
    })
    if (previousTag.length > 0) {
      return res.status(200).json({
        success: false,
        message: `User ${userId} has already tagged image ${imageId}`,
      })
    }

    //check if the catalog of the archive of the image belongs to user
    const image = await ImageModel.findById(imageId)
    const imageInCatalogRes = await imageInCatalog(
      image,
      req.user.data.catalogs
    )

    if (!imageInCatalogRes.success) {
      return res.status(200).json({
        success: false,
        message: imageInCatalogRes.message,
      })
    }

    //check if any matching tags: DO BEFORE ADDING TAG
    const compareResult = await image.compareTags(tags, ['Additional Comments'])
    const finalizable = compareResult.numMatch === compareResult.numberOfMatches

    //create
    const newTag = await TagModel.create({
      date: Date.now(),
      imageId: imageId,
      userId: req.user.data._id,
      tags: tags,
      final: finalizable,
    })

    res.newTag = newTag

    //If finalized, update imageDoc to have this new tag
    if (finalizable) {
      log({
        message: `Image ${imageId} is finalizable`,
        type: 'info',
      })
      await ImageModel.updateOne(
        { _id: imageId },
        { finalTag: newTag._id, taggable: true }
      )
    }

    next()
  }
)

export { tagImage }
