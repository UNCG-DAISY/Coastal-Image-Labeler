/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model, Types } from 'mongoose'
import { ImageDocument } from '../../interfaces/models'
import { ArchiveModel } from './Archive'
import pathValidation from '../utils/pathSchema'
// import { TagModel } from './Tag'
// import { compareTags } from '../utils/compareTags'
//import { CatalogModel } from './Catalog'

const ImageSchema: Schema = new Schema(
  {
    archive: {
      type: Types.ObjectId,
      required: [true, 'Please which archives this image is in'],
    },
    dateAdded: {
      type: Date,
    },
    name: {
      type: String,
      required: [true, 'Please add a name of image with its extension'],
      trim: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    path: pathValidation,
    taggable: {
      type: Boolean,
      required: [true, 'Please tell if this image is taggable or not'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

//instance method, on document
// ImageSchema.methods.compareTags = async function (tag: any, ignoreFields: any) {
//   let numMatch = 1
//   const allTags = await TagModel.find({ imageId: this._id })

//   for (const currentTag of allTags) {
//     const isSame = await compareTags(tag, currentTag.tags, ignoreFields)

//     if (isSame) {
//       numMatch++
//     }
//   }

//   return {
//     numMatch: numMatch,
//     numberOfMatches: this.numberOfMatches,
//   }
// }

//Document middleware
ImageSchema.post<ImageDocument>('save', async function (this: ImageDocument) {
  await ArchiveModel.updateImageCount(this.archive)
})

//Document middleware
ImageSchema.post<ImageDocument>('remove', async function (this: ImageDocument) {
  await ArchiveModel.updateImageCount(this.archive)
})

//This makes it so that the name and archive pair are unique
ImageSchema.index({ name: 1, archive: 1 }, { unique: true })

export const ImageModel: Model<ImageDocument> = model('Image', ImageSchema)
