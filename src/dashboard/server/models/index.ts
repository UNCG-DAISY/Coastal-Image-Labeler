import { ArchiveModel } from './Archive'
import { AssignedImageModel } from './AssignedImages'
import { CatalogModel } from './Catalog'
import { ImageModel } from './Image'
//import { ImageServeOrderModel } from './ImageServeOrder'
import { TagModel } from './Tag'
import { UserModel } from './User'
import { QuestionSetModel } from './QuestionSet'
import { NotificationModel } from './Notification'
import { log } from '../utils/logger'
// import imageServeOrderDefault from '../../data/default/imageServeOrder.json'
import questionSetDefault from '../../data/default/questionSet.json'

export function RegisterModels() {
  const models = [
    ArchiveModel,
    AssignedImageModel,
    CatalogModel,
    ImageModel,
    //ImageServeOrderModel,
    TagModel,
    UserModel,
    QuestionSetModel,
    NotificationModel,
  ]
  const names = []
  models.map((model) => names.push(model.modelName))
  //console.log(`Model ${model.modelName} registered`)
  log({
    message: `Models: ${names.toString()} registered`,
    type: 'ok',
  })
}

export async function RegisterModelDefaults() {
  const defaultQuestionExists = await QuestionSetModel.findOne({
    name: 'Default Question Set',
  })
  if (!defaultQuestionExists) {
    await QuestionSetModel.create({
      _id: questionSetDefault._id,
      description: questionSetDefault.description,
      name: questionSetDefault.name,
      questions: questionSetDefault.questions,
    })
  }

  // const defaultServeExists = await ImageServeOrderModel.findOne({
  //   type: 'random',
  // })
  // if (!defaultServeExists) {
  //   await ImageServeOrderModel.create({
  //     type: imageServeOrderDefault.type as 'random',
  //     _id: imageServeOrderDefault._id,
  //   })
  // }
}
