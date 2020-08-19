/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model } from 'mongoose'
import { ImageServeOrderDocument } from '../../interfaces/models'

//import { CatalogModel } from './Catalog'

const ImageServeOrder: Schema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Assign Image Id'],
      enum: ['random'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const ImageServeOrderModel: Model<ImageServeOrderDocument> = model(
  'ImageServeOrder',
  ImageServeOrder
)
