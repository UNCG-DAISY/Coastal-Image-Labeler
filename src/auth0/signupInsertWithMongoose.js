//function in auth0 for adding user to the DB on signup
// REMEBER TO REPLACE THE DB URI, AND DONT COMMIT IT.

async function (user, context, callback) {

  try {
    //If user has already logged in (as in accounts already made) or just refreshing token, do nothing
    if (context.stats.loginsCount > 1 || context.protocol === 'oauth2-refresh-token') {
      return callback(null, user, context);
    }
    const Mongoose = require('mongoose@5.6.11');

    //create schema
    const userSchema = new Mongoose.Schema(
      {
        catalogs: {
          type: [Mongoose.Types.ObjectId],
          default: [],
        },
        dateAdded: {
          type: Date,
          default: Date.now(),
        },
        roles: {
          type: [String],
          default: ["tagger"],
        },
        userId: {
          required: [true, 'UserId not passed'],
          unique: true,
          type: String,
        },
        userName: {
          required: [true, 'Username not passed'],
          unique: true,
          type: String,
        },
      },
      {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      }
    );
    const UserModel = Mongoose.model('User', userSchema);

    const CatalogModel = Mongoose.model('Catalog', new Mongoose.Schema({
      name: {
        type: String,
        required: [true, 'Please provide catalog name'],
        unique: true,
        maxlength: [128, 'Name can not be longer than 128 characters'],
      },
    }));

    //connect
    await Mongoose.connect('XXXX', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    //finds the demo catalog to add
    const demoCatalog = await CatalogModel.findOne({ name: "Priority" });

    //check if user has been created already
    const userExists = await UserModel.findOne({
      userId: user.user_id,
      userName: user.name,
    });

    //if user doesnt exist, create them
    if (!userExists) {
      let catalogDefault = [];
      //if demo catalog is found, add it
      if (demoCatalog) {
        catalogDefault.push(demoCatalog._id);
      }

      //create
      await UserModel.create({
        userId: user.user_id,
        userName: user.name,
        dateAdded: Date.now(),
        catalogs: catalogDefault
      });
    }
  } catch (error) {
    console.log(error);
  }

  // TODO: implement your rule
  return callback(null, user, context);
}