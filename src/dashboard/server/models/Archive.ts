/*
    Model for archives. Contains a link to the storm it falls under
*/

import { Schema, model, Types, HookNextFunction } from 'mongoose'
import { ArchiveModelType, ArchiveDocument } from '../../interfaces/models'
import { CatalogModel } from './Catalog'
import { ImageModel } from './Image'

const archiveScehma: Schema = new Schema(
  {
    dateAdded: {
      type: Date,
    },
    description: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Please provide archive name'],
      unique: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    path: Object,
    // {
    //   original: {
    //     type: String,
    //     required: [true, 'Please provide archive path'],
    //     unique: true,
    //     maxlength: [128, 'Path can not be longer than 128 characters'],
    //   },
    //   compressed: {
    //     type: String,
    //     unique: true,
    //     maxlength: [128, 'Path can not be longer than 128 characters'],
    //   },
    // },
    catalog: {
      type: Types.ObjectId,
      required: true,
      ref: 'Catalog',
    },
    taggable: {
      type: Boolean,
      required: [true, 'Please provide if archive is taggable or not.'],
    },
    totalImages: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

archiveScehma.virtual('getCatalog', {
  ref: 'Catalog',
  localField: 'catalog',
  foreignField: '_id',
  justOne: false,
})

//updates archives image count
archiveScehma.statics.updateImageCount = async function (
  archiveId: Types.ObjectId
) {
  const images = await this.model('Image').find({ archive: archiveId })
  await this.model('Archive').updateOne(
    { _id: archiveId },
    { totalImages: images.length }
  )
}

archiveScehma.methods.updateArchiveImageCount = async function () {
  const images = await this.model('Image').find({ archive: this._id })
  await this.model('Archive').updateOne(
    { _id: this._id },
    { totalImages: images.length }
  )
}

//Query Middleware
archiveScehma.post('updateOne', async function (this: ArchiveDocument) {
  //@ts-ignore
  const archive = await ArchiveModel.findOne(this.getQuery())
  await CatalogModel.updateImageCount(archive.catalog)
})

//delete images when this gets deleted
//document, doc.remove()
archiveScehma.pre('remove', async function (next: HookNextFunction) {
  const images = await ImageModel.find({ archive: this._id })

  console.log(`Deleting ${images.length} images`)

  const deletePromises = []
  for (const image of images) {
    deletePromises.push(image.remove())
  }
  await Promise.all(deletePromises)

  next()
})

//makes it so archive name and catalog id pair are unique
archiveScehma.index({ name: 1, catalog: 1 }, { unique: true })
export const ArchiveModel: ArchiveModelType = model('Archive', archiveScehma)
