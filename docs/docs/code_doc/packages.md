---
id: packages
title: Packages
sidebar_label: Packages
---

This is an explanation of the more important packages in the project Seperated by Server/Site and CLI packages.


## Server/Site

These are the noteable packages that are used in the project. A full list can be found in the corresponding `package.json` files.

### @material-ui/core

This is the UI component library used for the overall style of the website. The
website for the package is [here](https://material-ui.com/). It follows the
material UI principles laid out by Google.

### dotenv

This package allows for the use of `.env` files which contain environment
variables such as database passwords, which ports the host server is on,
or if the server is in development or production mode. However the main `.env` files are loaded by Nextjs where `dotenv` is used for unit testing.

### express

This is one of the most critical packages. It is a web framework for node.js
that simplifies code alot. It's great, so much so I will link it [here](https://expressjs.com/).

### express-session

Related to express package [here](#express). Handles session management and tokens.

### express-validator

This packages help abstract out request body and param validation to ensure that the correct data is sent. 

### mongoose

Adds object modeling for MongoDB documents. MongoDB is a noSql database so
there isn't any structure to entries (anything can be added to anything).
Mongoose adds some structure to those entries such as making sure certain
fields exists or only have certain data types. Found [here](https://mongoosejs.com/)

### next

A reactJs framework that allows for server side rendered pages. Found [here](https://nextjs.org/)

### passport

Authentication package. Found [here](http://www.passportjs.org/).

### passport-auth0

Related to the [above](#passport) when using the Auth0 method of signin, which can be found [here](https://auth0.com/).

### react

A JavaScript library for building user interfaces, very important, found [here](https://reactjs.org/)


## CLI

Some of the packages carry over from the server/site such as the database packages of MongoDB and Mongoose.

### Commander

The main package that sets up the command line interface.

### Configstore

Allows to store data passed to the CLI, such as the MongoDB URI.

### Inquirer

Allows for user input into the CLI

## Unit Testing, Linting, Formatting

One major change for v3 Dashboard was the addition of unit testing, linting and formatting of code.

### Jest

Unit test package.

### node-mocks-http

Allows to create fake Request and Response Objects for unit testing.

### eslint

Performs linting to help keep code up to good practices and checks syntax.

### prettier

Formats code.

### husky

Runs linting and formatting commands on commits and push events.

