---
id: auth0
title: Auth0
sidebar_label: Auth0
---

Auth0, found [here](https://auth0.com/), is the provider for session
management. Auth0 permits users to signin using Gmail, GitHub,
LinkedIn and Microsoft accounts, or just make a new username/password. Auth0
handles  all the security features (e.g., session management, user storing in
the database or other risky aspects related to sessions).

## Setup

As mentioned in [Packages](/code_documentation/packages), the `dotenv` package
allows the use of a file called `config.env` that contains the environment
variables. Of these environment variables some of them are secrets such as the
password to connect to the database. In this same `config.env` is the
information to interact with Auth0.

## config.env

This is the contents of the `config.env` file

```js
NODE_ENV="development"
PORT=6969

//Both below can be found from MongoDb.
MONGO_URI_DEV = "The information for development database. "
MONGO_URI_PRODUCTION = "The information for production database."

//Auth0 related
AUTH0_DOMAIN= "String, found on Auth0"
AUTH0_TOKEN_URL = "AUTH0_DOMAIN/oauth/token" // Replace AUTH0_DOMAIN with the value above
AUTH0_CLIENT_ID= "String, found on Auth0, very important that this is kept secret"
AUTH0_CLIENT_SECRET= "String, found on Auth0, very important that this is kept secret"

//make sure the port above and below are same
AUTH0_CALLBACK_URL= "https://coastalimagelabeler.science/callback"
BASE_URL= "https://coastalimagelabeler.science"

//Where compressed images are saved
//Inside the file structure is the same as
//where the image is saved.
COMPRESS_FOLDER = "/datadrive2/compressed/archives"
```

## Finding values on Auth0

After logging into Auth0, you can find values:

Go to my `Applications` and select the correct one.
![app6](../../img/code_documentation/my_applications.png "Applications6")

The secret values can be found here.
![app5](../../img/code_documentation/secret_values.png "Applications5")

And then set the callback URLS. Here they are localhost because of testing but for production they would be the machines IP.
![app7](../../img/code_documentation/callback_urls.png "Applications7")

<!-- ![secrets](../../images/secrets.png "Secrets")
![callbacks](../../images/callbacks.png "Callbacks") -->

