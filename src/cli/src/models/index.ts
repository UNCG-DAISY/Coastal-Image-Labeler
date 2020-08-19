import { ArchiveModel } from './Archive'
import { AssignedImageModel } from './AssignedImages'
import { CatalogModel } from './Catalog'
import { ImageModel } from './Image'
import { ImageServeOrderModel } from './ImageServeOrder'
import { TagModel } from './Tag'
import { UserModel } from './User'
import { QuestionSetModel } from './QuestionSet'
import { log } from '../utils/logger'
export function RegisterModels() {
  const models = [
    ArchiveModel,
    AssignedImageModel,
    CatalogModel,
    ImageModel,
    ImageServeOrderModel,
    TagModel,
    UserModel,
    QuestionSetModel,
  ]
  const names = []
  models.map((model) => names.push(model.modelName))
  //console.log(`Model ${model.modelName} registered`)
  log({
    message: `Models: ${names.toString()} registered`,
    type: 'ok',
  })
}
