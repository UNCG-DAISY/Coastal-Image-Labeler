import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager'

export default process.on('unhandledRejection', async (err: any) => {
  console.error(`Error => ${err?.message ?? 'undefined error'}`)

  const uriManager = new UriManager()
  const mongoConnection = new MongoConnection(uriManager.getKey())
  await mongoConnection.close()

  //Exit server on fail
  process.exit(1)
})
