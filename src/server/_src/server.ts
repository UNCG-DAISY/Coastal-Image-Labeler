//imports
import express, { Application } from 'express'
//import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
//import fileupload from 'express-fileupload'
import colors from 'colors'
colors
import {connectDB} from './db'
import {errorHandler} from './middleware/error'

// Load env vars
dotenv.config({  
    path: './_config/config.env'
});

const isDev = process?.env?.NODE_ENV === 'development' ? true:false

//Connect to DB via Mongoose
connectDB()

//Load route files
import images from './routes/images'

const app: Application = express();

// Body parser so that json can be recieved
app.use(express.json())

//Log all traffic
app.use(morgan('dev'))

//File upload
// app.use(fileupload())
//app.use(express.static(path.join(__dirname,'../public')))

// Mount routers
app.use('/api/v1/images',images)

// This handles errors that happen during API calls
app.use(errorHandler)

const PORT = process.env.PORT ?? 5000;

//Run server
const server = app.listen(
    PORT,
    () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold) 
    }
)

//Handle unhandled promise rejections
process.on('unhandledRejection', (err:any,promise: Promise<any>) => {

    console.log(`Error: ${err?.message ?? 'undefined error'}`.red)
    
    //Exit server on fail
    server.close(() => {
        process.exit(1)
    })
})