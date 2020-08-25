---
id: auth0
title: Setup
sidebar_label: Setup
---

Auth0, found [here](https://auth0.com/), is the provider for session
management. Auth0 permits users to signin using Gmail, GitHub,
LinkedIn and Microsoft accounts, or just make a new username/password. Auth0
handles  all the security features (e.g., session management, user storing in
the database or other risky aspects related to sessions).

## Default .env file

All the `.env` files are under `src/dashboard/site`. There should already be a filed called `src/dashboard/site/.env` which serves as the template to list all the used variables along with some defaults if possible. This is what it looks like

```js title="default .env"
NODE_ENV = "development"
NEXT_PUBLIC_NODE_ENV = "development"
NEXT_PUBLIC_PORT = 8080
NEXT_PUBLIC_PROTOCOL = 'HTTP'
NEXT_PUBLIC_DOMAIN_NAME = 'localhost:8080'
NEXT_PUBLIC_LOGGING = true

MONGO_URI = ""

AUTH0_DOMAIN = ""
AUTH0_CLIENT_ID = ""
AUTH0_CLIENT_SECRET = ""
AUTH0_CALLBACK_URL = ""
BASE_URL = ""

NEXT_PUBLIC_Error_Image = "C:/Users/Skool/Desktop/Error.png"
NEXT_PUBLIC_Time_Nextjs_Calls = false
```

- Any env variable starting with `NEXT_PUBLIC_*` will be available on both the site and server. Without this they will only be available on server.

- For example `NEXT_PUBLIC_NODE_ENV` is used to simply display the node env on the site without having to do any API calls

- `NEXT_PUBLIC_Error_Image` Is the error image to show if for whatever reason images can be found
- `NEXT_PUBLIC_Time_Nextjs_Calls` By default the response time logging function only records the response times for calls to `/api/*`. With `NEXT_PUBLIC_Time_Nextjs_Calls` as true the logging function will show the response times for every other call which is generally nextjs calls to load the page.
- `NEXT_PUBLIC_LOGGING` Enables logging.


## Creating .env files

There are 2 .env files that need to be created with an optional 3rd if you want to run unit tests on the local machine. The 2 mandatory files are `src/dashboard/site/.env.development.local` and 
`src/dashboard/site/.env.production.local`. The 3rd optional file is `src/dashboard/site/.env.test.local`. 

:::warning
As a note any file with the format `.env.*.local` will be ignored by git.
:::

Values for the Auth0 variables can be found by following [here](auth0Values)



## Auth0 Setup

There are 2 Auth0 Tenants that are being used. One is for production and the other is for development. The reason being is that each inserts a User on first signin into the database. This is done through the use of rules.

- The rules section is under `https://manage.auth0.com/dashboard/us/NAME-OF-TENANT/rules`
- The code for the rule is as follows. Can be found at `src/auth0`

```js title="Enter user into DB on signup/first login rule"
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

  
  //MAKE SURE TO PUT IN THE MONGODB URI
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
```
:::warning
- Make sure to have a catalog called `demo` as a default catalog to assign, or remove code if there is none.
- Make sure to place the Mongodb URI 
:::
