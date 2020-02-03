//imports
import express, { Application } from 'express'
import { Request,Response,NextFunction } from "express"
//import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
//import fileupload from 'express-fileupload'
import colors from 'colors'
colors
import {connectDB} from './db'
import {errorHandler} from './middleware/v1/error'
//Next js module that allows us to run nextjs and server
import next from 'next'
//Load route files
import images from './routes/v1/test'

// 1 - importing dependencies
import session from "express-session";
import passport from "passport";
import Auth0Strategy from"passport-auth0";
import uid from 'uid-safe';
import {authRoutes} from "./utils/v1/auth-routes"
import {getManagementTokens} from './utils/v1/auth0_tokens'
import * as types from './index'


// Load env vars
dotenv.config({  
    path: './_config/config.env'
});

const dev = process.env.NODE_ENV !== 'production'

//relative to package.json
const nextApp = next({ dev,dir:'./_site' })
const handle = nextApp.getRequestHandler()

nextApp.prepare()
.then(async () => {
    
    global.MANGAGEMENT_TOKEN = await getManagementTokens()

    if(global.MANGAGEMENT_TOKEN) {
        console.log("Management token recieved".magenta)
    }
    //Connect to DB via Mongoose
    connectDB()

    const app: Application = express();

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
        // console.log('CALLED----------------------------------------------------')
        // console.log(Object.keys(req?.user))
        if (!req.isAuthenticated()) return res.redirect("/login");
        next();
    };

    // Body parser so that json can be recieved
    app.use(express.json())

    //Log all traffic
    //app.use(morgan('dev'))

    //File upload
    // app.use(fileupload())
    //app.use(express.static(path.join(__dirname,'../public')))

    // Mount routers
    app.use('/api/v1/images',images)

    // This handles errors that happen during API calls
    app.use(errorHandler)

    //Auth these pages
    app.use("/auth/*", restrictAccess);

    //Everything else is a webpage
    app.get('*', (req, res) => {
        return handle(req, res)
    })

    const PORT = process.env.PORT ?? 5000;

    const server = app.listen(PORT,() => {
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

    //Test getting roles lol
    
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})
