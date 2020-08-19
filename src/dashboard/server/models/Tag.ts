/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model, Types, HookNextFunction } from 'mongoose'
import { TagDocument } from '../../interfaces/models'
import { ImageModel } from './Image'
import { ArchiveModel } from './Archive'

//import { CatalogModel } from './Catalog'

const TagSchema: Schema = new Schema(
  {
    imageId: {
      type: Types.ObjectId,
      required: [true, 'Assign Image Id'],
      ref: 'Image',
    },
    userId: {
      type: Types.ObjectId,
      required: [true, 'Assign Image Id'],
      ref: 'User',
    },
    catalogId: {
      type: Types.ObjectId,
      ref: 'Catalog',
    },
    archiveId: {
      type: Types.ObjectId,
      ref: 'Archive',
    },
    tags: {
      type: Object,
    },
    date: {
      type: Date,
      required: [true, 'Assign tag date'],
    },
    ignoreFields: [String],
    final: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

TagSchema.pre<TagDocument>('save', async function (next: HookNextFunction) {
  //if there is no archiveId, add one
  const image = await ImageModel.findOne({ _id: this.imageId })
  this.archiveId = image.archive

  //add catalogId
  const archive = await ArchiveModel.findOne({ _id: this.archiveId })
  this.catalogId = archive.catalog

  next()
})

TagSchema.index({ imageId: 1, userId: 1 }, { unique: true })

export const TagModel: Model<TagDocument> = model('Tag', TagSchema)
