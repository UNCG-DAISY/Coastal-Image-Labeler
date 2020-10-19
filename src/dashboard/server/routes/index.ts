import { Express } from 'express'

//import routes
import test from './test'
import user from './user'
import catalog from './catalogs'
import archive from './archives'
import assignedImages from './assignedImages'
import image from './image'
//import imageServeOrder from './imageServeOrder'
import tags from './tags'
import questionSet from './questionSet'
import notification from './notifications'

export function RegisterRoutes(server: Express) {
  //Register routes
  server.use('/api/test', test)
  server.use(`/api/user`, user)
  server.use(`/api/catalog`, catalog)
  server.use(`/api/archive`, archive)
  server.use(`/api/assignedImages`, assignedImages)
  server.use(`/api/image`, image)
  //server.use(`/api/imageServeOrder`, imageServeOrder)
  server.use(`/api/tags`, tags)
  server.use(`/api/qset`, questionSet)
  server.use(`/api/notifications`, notification)
}
