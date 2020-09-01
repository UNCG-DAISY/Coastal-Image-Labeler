import { TagModel } from '../models/Tag'
import { log } from './logger'

interface Params {
  userId?: string
  catalogId?: string
  imageId?: string
  archiveId?: string
}

async function tagModelAggregate(query: Params) {
  log({
    message: `Tag model aggregating for ${JSON.stringify(query)}`,
    type: 'info',
  })

  const data = await TagModel.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: '$catalogId',
        numTagsInCatalog: { $sum: 1 },
        doc: { $push: '$$ROOT' },
      },
    },
  ])
  return data
}

export { tagModelAggregate }
