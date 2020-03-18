/*
    This exported function connectDB is used to connect to the cloud Mongo DB
*/

import { connect, Mongoose} from 'mongoose'

export const connectDB = async () => {

    //Get the uri to connect from the enviroment variables. Assume by default to use the development db
    let db_uri:string = process?.env?.MONGO_URI_DEV

    //If in production mode, use production db
    if(process.env.NODE_ENV === 'production') {
        db_uri = process?.env?.MONGO_URI_PRODUCTION
    }
    
    //Inform which DB using
    console.log(`Using ${process.env.NODE_ENV === 'production'? 'production': 'development'} database`.magenta)

    //Connect
    const conn: Mongoose = (await (connect(db_uri as string, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })))
    
    //Inform that the connection has been made
    console.log(`MongoDB connected: ${conn?.connection?.host}`.cyan.underline.bold)
   
    
}