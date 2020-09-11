import { ArchiveModel } from '../../models/Archive'
import { ArchiveDocument } from '../../../interfaces/models'
import MongoConnection from '../../lib/MongoConnection'
import UriManager from '../../lib/UriManager'
import { performance } from 'perf_hooks'
import fs from 'fs'
import { createArchives } from './createArchive'
import { CatalogModel } from '../../models/Catalog'
import cliProgress from 'cli-progress'

type ArchiveDataType = {
  catalogId: string
  archiveName: string
  imageFormat: string[]
}

const archive = {
  async delete({ id }: { id: string }) {
    //connect to db
    const uriManager = new UriManager()
    const mongoConnection = new MongoConnection(uriManager.getKey())
    await mongoConnection.connect()

    let archive: ArchiveDocument
    //check to see if archive exists.
    try {
      archive = await ArchiveModel.findById(id)
      if (archive) {
        const t1 = performance.now()
        await archive.remove()
        const t2 = performance.now()
        console.log(`Archive deletion = ${t2 - t1}ms`)
      } else {
        throw `Archive doesnt exist with id ${id}`
      }
    } catch (error) {
      console.log('---Error---')
      console.log(error)
    }

    await mongoConnection.close()
  },
  async add({ path }: { path: string }) {
    //connect to db
    const uriManager = new UriManager()
    const mongoConnection = new MongoConnection(uriManager.getKey())
    await mongoConnection.connect()

    const archiveCreationBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    )

    const errors = []
    try {
      //get the file
      const file = JSON.parse(fs.readFileSync(path, 'utf8'))
      const archives: ArchiveDataType[] = file.archives
      //archiveCreationBar.start(archives.length, 0)

      let count = 0
      for (const archiveData of archives) {
        //see if catalog exists
        const catalog = await CatalogModel.findById(archiveData.catalogId)
        if (!catalog) {
          errors.push(`No catalog with id ${archiveData.catalogId}`)
          continue
        }

        //see if archive exists
        const existingArchive = await ArchiveModel.findOne({
          name: archiveData.archiveName,
          catalog: archiveData.catalogId,
        })

        if (existingArchive !== null) {
          errors.push(
            `Archive with name ${archiveData.archiveName} of catalog id = ${archiveData.catalogId} already exists`
          )
          continue
        }

        //create archive
        const resCreateArchive = await createArchives({
          archiveName: archiveData.archiveName,
          catalogEntry: catalog,
          imageFormat: archiveData.imageFormat,
        })

        if (!resCreateArchive.success) {
          errors.push(resCreateArchive.message)
          continue
        }

        count++
        archiveCreationBar.update(count)
      }
    } catch (error) {
      errors.push(error)
    }

    archiveCreationBar.stop()
    //if errors print them
    if (errors.length > 0) {
      console.log(errors)
    }
    await mongoConnection.close()
  },
}

export default archive
