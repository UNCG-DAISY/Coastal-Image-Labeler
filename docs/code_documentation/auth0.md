# Auth0

Auth0, found [here](https://auth0.com/), is the provider I am using for session
managment. They have signup, signin, forget password handled and through them I
handle user sessions. Their signin/signup allows for using gmail, github,
linkedin and microsoft accounts, or just make a new username/password. This way
I let them handle all the security features and I dont have to worry about
session management, user storing in the database or other risky aspects related
to sessions.

## Setup

As mentioned in [Packages](/code_documentation/packages), the `dotenv` package allows the use of a file called `config.env` that contains the enviroment variables. Of these evnviroment variables some of them are secrects such as the password to connect to the database. In this same `config.env` is the information to interact with Auth0.

## config.env

This is the contents of the `config.env` file

```js
NODE_ENV="development"
PORT=5000

//Both below can be found from MongoDb.
MONGO_URI_DEV = "The information for development database. "
MONGO_URI_PRODUCTION = "The information for production database."

//Auth0 related
AUTH0_DOMAIN= "String, found on Auth0"
AUTH0_TOKEN_URL = "AUTH0_DOMAIN/oauth/token" // Replace AUTH0_DOMAIN with the value above
AUTH0_CLIENT_ID= "String, found on Auth0, very important that this is kept secrect"
AUTH0_CLIENT_SECRET= "String, found on Auth0, very important that this is kept secrect"

//make sure the port above and below are same
AUTH0_CALLBACK_URL= "http://localhost:5000/callback"
BASE_URL= "http://localhost:5000"
```

## Finding values on Auth0

After logging into auth0, you can find the values like so


![app4](../img/logo2.png "Applications4")
<!-- ![secrets](../../images/secrets.png "Secerets")
![callbacks](../../images/callbacks.png "Callbacks") -->
