import { connect, Mongoose, connection } from 'mongoose'
import colorize from '../utils/colorize'
class MongoConnection {
  conn: Mongoose
  uri: string

  constructor(uri: string) {
    this.uri = uri
  }

  async connect() {
    if (!this.uri) {
      console.log('No URI found'.red)
      return
    }

    this.conn = await connect(this.uri as string, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    colorize.info('Connected to DB')
  }

  async close() {
    connection.close()
    colorize.info('DB connection closed')
  }
}

export default MongoConnection
