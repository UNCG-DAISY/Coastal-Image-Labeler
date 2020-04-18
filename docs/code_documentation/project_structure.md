# Project Structure

The project is broken into 2 parts. Under `src/server/_site` is the "frontend" website. I put "frontend" in quotes as some parts of the code is executed on the server as it is server side rendered. Regardless all of it is geared to the functionality of the webpage. The second part is `src/server/_server` which is all code for the backend such as API calls, database connection, model creation, route handling and many more. Besides these two there is the folder `src/server/_config` which holds the `.env` file for enviroment variables. This file is ignored on github as it contains secrect values, there is a template file called `config.template.env` to show what the expected values are.

## Site

Inside the `src/server/_site` folder there are only two noteworthy folders to look at. They are `src/server/_site/components` and `src/server/_site/pages`. 

### Pages

`src/server/_site/pages` is as it sounds, it is the pages. For example we have the page `src/server/_site/pages/auth/home` which translates to `http://localhost:5000//auth/home` in the URL. One special case is `src/server/_site/pages/index` which is the home page and is just `http://localhost:5000/` or `http://localhost:5000//index`.

!!! note "about `/auth` pages"
    any page inside the folder `src/server/_site/pages/auth` requires the user
    to be logged in, this is ensured by the server code under
    `src/server/_server` and will redirect them to the home page if they are not.

### Components

`src/server/_site/components` is components for the pages or any utility functions. They are made in attempt to make the code more cleaner.

## Server

The structure of the server code is a litte bit more complicated then the frontend.

Starting in the root directory, `src/server/_server`, we have the most important file `src/server/_server/server.ts` which is the main server file that runs everything else. It handles the requests from the client for pages, api calls, registers the models, handles database entries and authentication.

Next we have `src/server/_server/db.ts` which handles connecting to the database. You dont need to edit this file directly if you want to change which database to connect to as you can edit the `.env` file in `src/server/_config/config.env`.

The files `src/server/_server/jsonSeeder.ts` and `src/server/_server/stormSeeder.ts` are used to populate the database. They shouldnt be used more then once or if theres a new storm/archive to add.

`src/server/_server/index.d.ts` can be ignored as its just the type definitions for typescript.

Now I will explain each folder in `src/server/_server`.

### _data

This folder contains test data to insert into the database and test images to show to the user.

### models

These are the models created by the `mongoose` package that help add some structure to the noSql database.

### middleware

These are helper functions that run whenever a certain API endpoint is hit. For example `src/server/_server/middleware/v1/authentucated.ts` makes sure a user is logged in when accessing an API or `src/server/_server/middleware/v1/error.ts` handles errors.

### utils

General purpose helper functions

### controllers

Functions that perform certains tasks such as finding a user, or entering into a database.

### routes

These assign an API endpoint with a controller function mentioned above. For example the endpoint `user/v1/getUser` will be assigned to the `getUser` function and returns data on a specific user.