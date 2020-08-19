//Registers the types
// eslint-disable-next-line
import * as Types from '../interfaces'

import dotenv from 'dotenv'

// Load env vars
dotenv.config({
  path: './test.env',
})

import express, { Request, Response } from 'express'
import next from 'next'

//import db connection
import { connectDB, closeConnection } from './db'

//logged with or without color depending on env
import { log } from './utils/logger'

//Generic function to handle erros
import { errorHandler } from './middlewares/error'

//register models
import { RegisterModels } from './models'

//routes
import { RegisterRoutes } from './routes'

//Security
import { initAuthentication } from './auth'

const dev = process.env.NODE_ENV !== 'production'

const app = next({
  dev,
  dir: './site',
})
const handle = app.getRequestHandler()
const port = ((process.env.NEXT_PUBLIC_PORT as unknown) as number) ?? 3000

;(async () => {
  try {
    await app.prepare()
    const server = express()

    //Connect to db first
    await connectDB()

    //Set up security and give functions
    const { restrictAccess } = initAuthentication(server)

    // Body parser so that json can be recieved on Api calls
    server.use(express.json())

    //register models
    RegisterModels()

    //Register api routes first
    RegisterRoutes(server)

    // This handles errors that happen during API calls
    server.use(errorHandler)

    //Only pages with /auth at the beginning need to be restricted
    server.use('/auth/*', restrictAccess)

    //Everything else is a site page
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    //start the server
    const serverObj = server.listen(port, (err?: any) => {
      if (err) throw err
      log({
        message: `> Ready on ${process.env.NEXT_PUBLIC_PROTOCOL}://${
          process.env.NEXT_PUBLIC_DOMAIN_NAME
        } - env: ${process.env.NODE_ENV ?? 'dev'} mode
        `,
        type: 'info',
      })
    })

    //Handle unhandled promise rejections
    process.on('unhandledRejection', (err: any) => {
      log({
        message: `--Error--: ${err?.message ?? 'undefined error'}`,
        type: 'error',
      })

      //Exit server on fail
      serverObj.close(() => {
        //close db
        closeConnection()
        process.exit(1)
      })
    })
  } catch (e) {
    console.error(e)
    //close db
    closeConnection()
    process.exit(1)
  }
})()
