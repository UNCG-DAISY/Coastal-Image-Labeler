/*
    This is the main server file.
*/

//imports
import express, { Application } from 'express' //God tier package for web framework
import { Request,Response,NextFunction } from "express" //Used for typing
import path from 'path'
import dotenv from 'dotenv' //Loads enviroment variables
//import morgan from 'morgan'
import fileupload from 'express-fileupload'
import colors from 'colors' //Allows for color in the terminal
colors
import {connectDB} from './db' //Function that connects to the DB
import {errorHandler} from './middleware/v1/error' //Generic function to handle erros
//Next js module that allows us to run nextjs and server
import next from 'next'

//Load route files
import users from './routes/v1/user' //Api calls for user
import archives from './routes/v1/archives'//Api calls for archives
import storms from './routes/v1/storms'//Api calls for storms
import roles from './routes/v1/roles'//Api calls for roles
import testApi from './routes/v1/testApi' 
import image from './routes/v1/image' 
//Import the react/server shared constants

//Packages for security
// 1 - importing dependencies
import session from "express-session";
import passport from "passport";
import Auth0Strategy from "passport-auth0";
import uid from 'uid-safe';
import {authRoutes} from "./utils/v1/auth-routes"//Handles login and logout
import {getManagementTokens} from './utils/v1/auth0_tokens'//Gets the mangagement token form Auth0 so we can access information
// import * as types from './index'

// Load env vars
dotenv.config({  
    path: './_config/config.env'
});

//Determine what enviroment mode we are in.
const dev = process.env.NODE_ENV !== 'production'

//This is telling to let next.js, the react server side rendering package, to handle routing
const nextApp = next({ dev,dir:'./_site' })//relative to package.json
const handle = nextApp.getRequestHandler()

nextApp.prepare()
.then(async () => {
    
    //Get the token from Auth0 and allow it to be globally used.
    //Note: im note sure if this is the best way.
    global.MANGAGEMENT_TOKEN = await getManagementTokens()

    if(global.MANGAGEMENT_TOKEN) {
        console.log("Management token recieved".magenta)
    }

    //Connect to DB via Mongoose
    connectDB()

    //Create our application
    const app: Application = express();

    //Security
    // 2 - add session management to Express
    const sessionConfig = {
        secret: uid.sync(18),
        cookie: {
        maxAge: 86400 * 1000 // 24 hours in milliseconds
        },
        resave: false,
        saveUninitialized: true
    };
    app.use(session(sessionConfig));

    // 3 - configuring Auth0Strategy
    const auth0Strategy = new Auth0Strategy(
        {
            domain: process.env.AUTH0_DOMAIN,
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL: process.env.AUTH0_CALLBACK_URL
        },
        function(accessToken, refreshToken, extraParams, profile, done) {
            return done(null, profile);
        }
    );

    // 4 - configuring Passport
    passport.use(auth0Strategy);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    // 5 - adding Passport and authentication routes
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(authRoutes);

    // 6 - you are restricting access to some routes
    const restrictAccess = (req: Request, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) return res.redirect("/login");
        next();
    };

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });
 
    // Body parser so that json can be recieved on Api calls
    app.use(express.json())

    //Allow for File upload
    app.use(fileupload())
    //Static files
    //Example: amenadiel/a420/420_test.png
    app.use(express.static(path.join(__dirname,'./_data/storms')))

    //Mount routers, appi calls
    //The first parameter is the name of the path and the 2nd is the file to use if an Api call with that path is received
    //For example
    // /api/v1/users/getUsername would be in the users.
    app.use('/api/v1/users',users)
    app.use('/api/v1/archives',archives)
    app.use('/api/v1/storms',storms)
    app.use('/api/v1/roles',roles)
    app.use('/api/v1/test',testApi)
    app.use('/api/v1/images',image)
    
    
    // This handles errors that happen during API calls
    app.use(errorHandler)

    //Only pages with /auth at the beginning need to be restricted
    app.use("/auth/*", restrictAccess);

    //Everything else is a webpage
    app.get('*', (req, res) => {
        return handle(req, res)
    })

    //Get the port and have the site on that port
    const PORT = (process.env.PORT as unknown as number) ?? 5000;
    const server = app.listen(PORT,'0.0.0.0',() => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
    })

    //Handle unhandled promise rejections
    process.on('unhandledRejection', (err:any,promise: Promise<any>) => {

        console.log(`Error: ${err?.message ?? 'undefined error'}`.red)
        
        //Exit server on fail
        server.close(() => {
            process.exit(1)
        })
    })
  
})
.catch((ex) => {
    //If any error, exit
    console.error(ex.stack)
    process.exit(1)
})
