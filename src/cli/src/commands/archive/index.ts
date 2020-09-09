import { ArchiveModel } from '../../models/Archive'
import colorize from '../../utils/colorize'
import { ArchiveDocument } from '../../../interfaces/models'
import MongoConnection from '../../lib/MongoConnection'
import UriManager from '../../lib/UriManager'

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
        await archive.remove()
      } else {
        throw `Archive doesnt exist with id ${id}`
      }
    } catch (error) {
      colorize.error(error)
    }

    await mongoConnection.close()
  },
}

export default archive
