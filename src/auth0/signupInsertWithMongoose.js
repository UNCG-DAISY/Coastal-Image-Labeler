
async function (user, context, callback) {

  //If user has already logged in (as in accounts already made) or just refreshing token, do nothing
  if (context.stats.loginsCount > 1 || context.protocol === 'oauth2-refresh-token') {
    return callback(null, user, context);
  }
  const Mongoose = require('mongoose@5.6.11');

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

  
  await Mongoose.connect('XXXX', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  const demoCatalog = await CatalogModel.findOne({name: "Demo"});
  
  await UserModel.create({
    userId: user.user_id,
    userName: user.name,
    dateAdded: Date.now(),
    catalogs:[demoCatalog._id]
  });
  // TODO: implement your rule
  return callback(null, user, context);
}