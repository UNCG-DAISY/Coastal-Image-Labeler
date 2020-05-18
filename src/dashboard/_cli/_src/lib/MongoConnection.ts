import { connect, Mongoose,connection} from 'mongoose'

class MongoConnection {
    conn:Mongoose;
    uri:string

    constructor(uri:string) {
        this.uri = uri
    }

    async connect() {
        if(!this.uri) {
            console.log('No URI found'.red )
            return
        }

        this.conn = await (connect(this.uri as string, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }));
        console.log('Connected to DB'.blue);
    }

    async close() {
        connection.close();
    }
}

export default MongoConnection