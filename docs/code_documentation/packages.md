# Packages

This is an explination for each package used and npm scripts that are in `package.json`.

## Package.json

This is the contents of the `package.json` file that can be found at `src/server/package.json`

```json
{
  "name": "psic_node_server",
  "version": "1.0.0",
  "description": "PSIC Node server",
  "main": "server.js",
  "scripts": {
    "build": "tsc",
    "test": "tsc && node ./_dist/test.js",
    "test2": "tsc && SET NODE_ENV=production&&node ./_dist/test.js",
    "dev": "nodemon --exec ts-node ./_src/server.ts",
    "dev2": "ts-node ./_src/server.ts",
    "start": "tsc && SET NODE_ENV=production&& node ./_dist/server.js",
    "start2": "SET NODE_ENV=production&& node ./_dist/server.js",
    "seederCreate": "ts-node ./_src/jsonSeeder.ts -i",
    "seederDel": "ts-node ./_src/jsonSeeder.ts -d",
    "seederRole": "ts-node ./_src/jsonSeeder.ts -r",
    "stormSeeder": "ts-node ./_src/stormSeeder.ts",
    "seeder": "npm run seederDel && npm run seederCreate"
  },
  "author": "Shah Nafis Rafique",
  "license": "MIT",
  "dependencies": {
    "@material-ui/core": "latest",
    "@material-ui/icons": "^4.9.1",
    "axios": "^0.19.2",
    "clsx": "latest",
    "colors": "^1.4.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-fileupload": "^1.1.6",
    "express-session": "^1.17.0",
    "ip": "^1.1.5",
    "isomorphic-fetch": "^2.2.1",
    "moment": "^2.24.0",
    "moment-timezone": "^0.5.27",
    "mongoose": "^5.8.3",
    "morgan": "^1.9.1",
    "next": ">=9.3.2",
    "node-geocoder": "^3.25.0",
    "passport": "^0.4.1",
    "passport-auth0": "^1.3.1",
    "prop-types": "latest",
    "react": "^16.13.0",
    "react-dom": "^16.13.0",
    "react-moment": "^0.9.7",
    "slugify": "^1.3.6",
    "uid-safe": "^2.1.5"
  },
  "devDependencies": {
    "@types/passport": "^1.0.2",
    "@types/express": "^4.17.2",
    "@types/express-fileupload": "^1.1.0",
    "@types/mongodb": "^3.3.14",
    "@types/mongoose": "^5.5.35",
    "@types/morgan": "^1.7.37",
    "@types/node": "^12.12.21",
    "@types/node-geocoder": "^3.24.1",
    "@types/react-dom": "^16.9.5",
    "nodemon": "^2.0.1",
    "ts-node": "^8.5.4",
    "typescript": "^3.7.5"
  }
}
```

## Overview of packages

I will be providing a short few sentences of each package. Most are important to maintaining the dashboard but some are not noteworthy and are used to assist other packages.

### @material-ui/core

Is the UI component library used for the overall style of the website. The website for the package is [here](https://material-ui.com/). It follows the material UI principles laid out by Google.

### @material-ui/icons

From the same place as [the above](#material-uicore) but for icons.

### axios

Used for api calls, but this package might soon be removed as its kind of redundent. For now it remains untill all instants of it are removed.

### clsx

This is a package is used to create unique classNames for components. It is not important to remember, just know that it exists and is used in select few areas.

### colors

This package is used to print colored text in the command line.

### dotenv

This package allows for the use of `.env` files which contain enviroment variables such as database passwords, which ports to host the server on, or if the server is in development or production mode.

### express

This is one of the most critical packages. It is a web framework for node.js that simplifies code alot. Its great, so much so I will link it [here](https://expressjs.com/).

### express-fileupload

Related to the package [above](#express). Allows for uploading of files from user to server.

### express-session

Again related to express package [here](#express). Handles session management, and tokens.

### ip

Simple package that gets the IP of the server so that we can create the API calls dynamically rather then hard coding the servers IP.

### isomorphic-fetch

Allows for the use of the browers `fetch` command on serverside. This is called when a server side rendered page needs to make some sort of call, such as getting user details or getting storms, before it sends the page to the user.

### moment

A time formatting library.

### moment-timezon

Related to the [above](#moment) package, helps with timezone coverting.

### mongoose

Adds object modeling for BongoDB documents. MongoDB is a noSql database so there isnt really any structure to entries as anything can be added to anything, mongoose adds some structure to those entries such as making sure certain fields exists or only have certain data types. Found [here](https://mongoosejs.com/)

### morgan

Allows for logging of api requests and responses. While not used its helpful for debugging.

### next

A reactJs framework that allows for server side rendered pages. Found [here](https://nextjs.org/)

### node-geocoder

Allows for geocoding. Currently not used but planed to be.

### passport

Authentication package. Found [here](http://www.passportjs.org/).

### passport-auth0

Related to the [above](#passport) when using the auth0 method of signin, which can be found [here](https://auth0.com/).

### prop-types

Not important to talk about. Subpackage for another package.

### react

A JavaScript library for building user interfaces, very important, found [here](https://reactjs.org/)

### react-dom

Related to the above package [here](#react)

### react-momen

Related to the above package [here](#react)

### slugify

Slugifies strings, used for formating various strings. Not important to remember.

### uid-safe

Security package.
