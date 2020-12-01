import { Schema, model, Types, HookNextFunction } from 'mongoose'
import { CatalogModelType } from '../../interfaces/models'
import { ArchiveModel } from './Archive'
import pathValidation from '../utils/pathSchema'

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
    path: pathValidation,
    zenodoInfo: [Object],
    zenodoData: Object,
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
      type: {
        type: String,
        enum: ['random', 'sequential'],
        default: 'random',
      },
      data: {
        type: Object,
        default: {},
      },
    },
    totalImages: {
      type: Number,
      default: 0,
    },
    ignoreFields: {
      type: [String],
      required: [true, 'Please provide if storm is taggable or not.'],
    },
  },
  {
    toJSON: { virtuals: true, minimize: false },
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

catalogScheme.pre('remove', async function (next: HookNextFunction) {
  const archives = await ArchiveModel.find({ catalog: this._id })

  console.log(`Deleting ${archives.length} archives`)

  const deletePromises = []
  for (const archive of archives) {
    deletePromises.push(archive.remove())
  }
  await Promise.all(deletePromises)

  next()
})

// Reverse populate with virtuals
catalogScheme.virtual('archives', {
  ref: 'Archive',
  localField: '_id',
  foreignField: 'catalog',
  justOne: false,
})

export const CatalogModel: CatalogModelType = model('Catalog', catalogScheme)
