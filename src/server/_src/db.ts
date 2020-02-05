import { connect} from 'mongoose'

export const connectDB = async () => {
    //Cant find type of connect(), ik its Mongoose but .host doesnt work

    let db_uri:string = process?.env?.MONGO_URI_DEV

    //If in production mode, use production db
    if(process.env.NODE_ENV === 'production') {
        db_uri = process?.env?.MONGO_URI_PRODUCTION
    }
    
    console.log(`Using ${process.env.NODE_ENV === 'production'? 'production': 'development'} database`.magenta)
    const conn: any = await (connect(db_uri as string, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }))
    
    console.log(`MongoDB connected: ${conn?.connection?.host}`.cyan.underline.bold)
   
    
}