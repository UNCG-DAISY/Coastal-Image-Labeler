//imports
import express, { Application } from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
colors
import {connectDB} from './db'


// Load env vars
dotenv.config({  
    path: './_config/config.env'
});

//Connect to DB via Mongoose
connectDB()

const app: Application = express();

// Body parser, so that json can be sent to server
app.use(express.json())

const PORT = process.env.PORT ?? 5000;

//Run server
const server = app.listen(
    PORT,
    () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold) 
    }
)


