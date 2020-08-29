import schedule from 'node-schedule'
import moment from 'moment'
import fs from 'fs'
import parser from 'cron-parser'

import { ArchiveModel } from '../models/Archive'
import { AssignedImageModel } from '../models/AssignedImages'
import { CatalogModel } from '../models/Catalog'
import { ImageModel } from '../models/Image'
import { TagModel } from '../models/Tag'
import { UserModel } from '../models/User'
import { QuestionSetModel } from '../models/QuestionSet'

import { log } from './logger'

function startCronJob(time) {
  schedule.scheduleJob(time, async function () {
    const exportTimeName = moment().format('MM-DD-YYYY-T-hh-mm-ss').toString()

    log({
      message: `[EXPORT] > Exporting data at time = ${exportTimeName}`,
      type: 'info',
    })

    const exportFolderRoot = process.env.BACKUP_FOLDER
    const exportFolder = `${exportFolderRoot}/${exportTimeName}`

    if (!fs.existsSync(exportFolder)) {
      fs.mkdirSync(exportFolder)
    }

    const users = await UserModel.find()
    const images = await ImageModel.find()
    const archives = await ArchiveModel.find()
    const catalogs = await CatalogModel.find()
    const questionSets = await QuestionSetModel.find()
    const assignedImages = await AssignedImageModel.find()
    const tags = await TagModel.find()

    log({
      message: `[EXPORT] > Got all export data`,
      type: 'ok',
    })

    const exportList = [
      {
        name: 'users.json',
        data: users,
      },
      {
        name: 'images.json',
        data: images,
      },
      {
        name: 'archives.json',
        data: archives,
      },
      {
        name: 'catalogs.json',
        data: catalogs,
      },
      {
        name: 'questionSets.json',
        data: questionSets,
      },
      {
        name: 'assignedImages.json',
        data: assignedImages,
      },
      {
        name: 'tags.json',
        data: tags,
      },
    ]

    exportList.forEach((info) => {
      const outputPath = `${exportFolder}/${info.name}`
      fs.writeFileSync(outputPath, JSON.stringify(info.data))

      log({
        message: `[EXPORT] > Exported to ${outputPath}`,
        type: 'ok',
      })
    })
  })
  const interval = parser.parseExpression(time)

  log({
    message: `CRON job for daily export set at = ${interval.next().toString()}`,
    type: 'time',
  })
}

export { startCronJob }
