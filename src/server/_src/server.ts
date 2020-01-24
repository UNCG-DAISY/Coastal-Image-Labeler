//imports
import express, { Application } from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
//This specific lib has to be ran like this before use
colors

// Load env vars
dotenv.config({  
    path: './_config/config.env'
});

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