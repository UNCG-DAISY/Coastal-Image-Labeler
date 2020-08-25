async function (user, context, callback) {
    if (context.stats.loginsCount > 1 || context.protocol === 'oauth2-refresh-token') {
        return callback(null, user, context);
    }
 
    const {MongoClient} = require("mongodb@3.1.4");
    const uri = `XXXXX`;
    const client = new MongoClient(uri, { useNewUrlParser: true });
 
    client.connect(err => {
        if (err) return callback(null, user, context);

        const collection = client.db('dev').collection('users');
        collection.insertOne({
            userId:user.user_id,
            userName:user.name,

            imagesTagged:[],
            assignedImages:[],
            roles:[],
            catalogs:[]
        }, (err, result) => {
            if (err) return callback(err);
            if (result.insertedCount !== 1) return callback("Unable not inserted.");

            callback(null);
            client.close();
        });

        return callback(null, user, context);
    });

 }