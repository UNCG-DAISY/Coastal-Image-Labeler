/*
    Model for images. Contains a link to the archive it falls under
*/

import { Schema, model, Model } from 'mongoose'
import { NotificationDocument } from '../../interfaces/models'
//import { CatalogModel } from './Catalog'

const NotificationSchema: Schema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const NotificationModel: Model<NotificationDocument> = model(
  'Notification',
  NotificationSchema
)
