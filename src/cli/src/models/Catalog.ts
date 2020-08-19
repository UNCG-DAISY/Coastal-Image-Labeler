/*
    Model for storms.
*/

import { Schema, model, Types } from 'mongoose'
import { CatalogModelType } from '../../interfaces/models'

const catalogScheme: Schema = new Schema(
  {
    dateAdded: {
      type: Date,
    },
    name: {
      type: String,
      required: [true, 'Please provide catalog name'],
      unique: true,
      maxlength: [128, 'Name can not be longer than 128 characters'],
    },
    path: {
      original: {
        type: String,
        required: [true, 'Please provide catalog path'],
        unique: true,
        maxlength: [128, 'Path can not be longer than 128 characters'],
      },
      compressed: {
        type: String,
        unique: true,
        maxlength: [128, 'Path can not be longer than 128 characters'],
      },
    },
    catalogInfo: {
      year: {
        type: Number,
        required: false,
        default: 1970,
      },
      link: {
        type: String,
        required: false,
        default: '',
      },
      description: {
        type: String,
        required: false,
        default: '',
      },
    },
    taggable: {
      type: Boolean,
      required: [true, 'Please provide if storm is taggable or not.'],
    },
    questionSet: {
      type: Types.ObjectId,
      required: [true, 'Please provide ID of question set'],
    },
    imageServeOrder: {
      type: Types.ObjectId,
      required: false,
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

catalogScheme.statics.updateImageCount = async function (
  catalogId: Types.ObjectId
) {
  //aggregate all archive models based on catalog id, and add totalImages
  const obj = await model('Archive').aggregate([
    {
      $match: { catalog: new Types.ObjectId(catalogId) },
    },
    {
      $group: {
        _id: '$catalog',
        totalImages: { $sum: '$totalImages' },
      },
    },
  ])

  try {
    await this.model('Catalog').findByIdAndUpdate(catalogId, {
      totalImages: obj[0]?.totalImages,
    })
  } catch (err) {
    console.error(err)
  }
}

// Reverse populate with virtuals
catalogScheme.virtual('archives', {
  ref: 'Archive',
  localField: '_id',
  foreignField: 'catalog',
  justOne: false,
})

export const CatalogModel: CatalogModelType = model('Catalog', catalogScheme)
