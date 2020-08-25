import { connect, Mongoose, connection } from 'mongoose'
import { log } from './utils/logger'

export const connectDB = async () => {
  //Get the uri to connect from the enviroment variables. Assume by default to use the development db
  const dbURI: string = process?.env?.MONGO_URI

  //for whatever reason if the uri is not defined, exit
  if (dbURI === '' || !dbURI) {
    log({
      message: 'No URI passed',
      type: 'error',
    })
    throw 'Database connection failed'
  }
  //Inform which DB using
  log({
    message: `Using ${process.env.NODE_ENV} Database`,
    type: 'info',
  })

  //Connect
  const conn: Mongoose = await connect(dbURI as string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  //Inform that the connection has been made
  log({
    message: `MongoDB connected: ${conn?.connection?.host}`,
    type: 'ok',
  })
}

//function to close the db connection
export const closeConnection = async () => {
  await connection.close()
  log({
    message: 'DB connection closed',
    type: 'ok',
  })
}
