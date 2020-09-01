/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model, Types, HookNextFunction } from 'mongoose'
import { AssingedImageDocument } from '../../interfaces/models'
import { ImageModel } from './Image'
// import { CatalogModel } from './Catalog'
import { ArchiveModel } from './Archive'
//import { CatalogModel } from './Catalog'

const AssignedImageSchema: Schema = new Schema(
  {
    imageId: {
      type: Types.ObjectId,
      required: [true, 'Assign Image Id'],
      ref: 'Image',
    },
    archiveId: {
      type: Types.ObjectId,
      ref: 'Archive',
    },
    catalogId: {
      type: Types.ObjectId,
      ref: 'Catalog',
    },
    userId: {
      type: Types.ObjectId,
      required: [true, 'Assign Image Id'],
      ref: 'User',
    },
    date: {
      type: Date,
      required: [true, 'Assign Image Id'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

AssignedImageSchema.virtual('archive', {
  ref: 'Archive',
  localField: 'archiveId',
  foreignField: '_id',
  justOne: true,
})
AssignedImageSchema.virtual('catalog', {
  ref: 'Catalog',
  localField: 'catalogId',
  foreignField: '_id',
  justOne: true,
})

AssignedImageSchema.pre<AssingedImageDocument>('save', async function (
  next: HookNextFunction
) {
  const image = await ImageModel.findOne({ _id: this.imageId })
  this.archiveId = image.archive

  //add catalogId
  const archive = await ArchiveModel.findOne({ _id: this.archiveId })
  this.catalogId = archive.catalog

  next()
})

AssignedImageSchema.index(
  { imageId: 1, userId: 1, archiveId: 1 },
  { unique: true }
)

export const AssignedImageModel: Model<AssingedImageDocument> = model(
  'AssignedImage',
  AssignedImageSchema
)
