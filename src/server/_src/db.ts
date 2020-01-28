import { connect} from 'mongoose'

export const connectDB = async () => {
    //Cant find type of connect(), ik its Mongoose but .host doesnt work
    const conn: any = await (connect(process?.env?.MONGO_URI as string, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }))
    
    console.log(`MongoDB connected: ${conn?.connection?.host}`.cyan.underline.bold)
   
    
}