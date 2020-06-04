"use strict";
/*
    This is the main server file.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
const express_1 = __importDefault(require("express")); //God tier package for web framework
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv")); //Loads enviroment variables
//import morgan from 'morgan'
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const colors_1 = __importDefault(require("colors")); //Allows for color in the terminal
colors_1.default;
const db_1 = require("./db"); //Function that connects to the DB
const error_1 = require("./middleware/v1/error"); //Generic function to handle erros
//Next js module that allows us to run nextjs and server
const next_1 = __importDefault(require("next"));
//Load route files
const user_1 = __importDefault(require("./routes/v1/user")); //Api calls for user
const archives_1 = __importDefault(require("./routes/v1/archives")); //Api calls for archives
const catalogs_1 = __importDefault(require("./routes/v1/catalogs")); //Api calls for storms
//import roles from './routes/v1/roles'//Api calls for roles
const testApi_1 = __importDefault(require("./routes/v1/testApi"));
const image_1 = __importDefault(require("./routes/v1/image"));
const questionSet_1 = __importDefault(require("./routes/v1/questionSet"));
//Import the react/server shared constants
//Packages for security
// 1 - importing dependencies
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_auth0_1 = __importDefault(require("passport-auth0"));
const uid_safe_1 = __importDefault(require("uid-safe"));
const auth_routes_1 = require("./utils/v1/auth-routes"); //Handles login and logout
const cors_1 = __importDefault(require("cors"));
const colorize_1 = __importDefault(require("./utils/v1/colorize"));
const logger_1 = require("./utils/v1/logger");
// Load env vars
dotenv_1.default.config({
    path: './_config/config.env'
});
//Determine what enviroment mode we are in.
const dev = process.env.NODE_ENV !== 'production';
//This is telling to let next.js, the react server side rendering package, to handle routing
const nextApp = next_1.default({
    dev,
    dir: dev ? './_site' : './_site/'
}); //relative to package.json
const handle = nextApp.getRequestHandler();
nextApp.prepare()
    .then(async () => {
    //Get the token from Auth0 and allow it to be globally used.
    //Note: im note sure if this is the best way.
    //https://manage.auth0.com/dashboard/us/XXX/apis/management/authorized-clients
    // global.MANGAGEMENT_TOKEN = await getManagementTokens()
    // if(global.MANGAGEMENT_TOKEN) {
    //     //console.log("Management token recieved".magenta)
    //     colorize.success("Management token recieved")
    // }
    var _a;
    //Connect to DB via Mongoose
    db_1.connectDB();
    //Create our application
    const app = express_1.default();
    //Security
    // 2 - add session management to Express
    const sessionConfig = {
        secret: uid_safe_1.default.sync(18),
        cookie: {
            maxAge: 86400 * 1000 // 24 hours in milliseconds
        },
        resave: false,
        saveUninitialized: true
    };
    app.use(express_session_1.default(sessionConfig));
    // 3 - configuring Auth0Strategy
    const auth0Strategy = new passport_auth0_1.default({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    }, function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
    });
    // 4 - configuring Passport
    passport_1.default.use(auth0Strategy);
    passport_1.default.serializeUser((user, done) => done(null, user));
    passport_1.default.deserializeUser((user, done) => done(null, user));
    // 5 - adding Passport and authentication routes
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(auth_routes_1.authRoutes);
    // 6 - you are restricting access to some routes
    const restrictAccess = (req, res, next) => {
        if (!req.isAuthenticated())
            return res.redirect("/login");
        next();
    };
    // app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Credentials","true")
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    //     //res.header("Access-Control-Allow-Headers", "*");
    //     next();
    // });
    // Body parser so that json can be recieved on Api calls
    app.use(express_1.default.json());
    //app.use(bodyParser.json())
    // Allow cors everywhere
    app.use(cors_1.default());
    //Allow for File upload
    app.use(express_fileupload_1.default());
    //Static files
    //Example: amenadiel/a420/420_test.png
    app.use(express_1.default.static(path_1.default.join(__dirname, './_data/storms')));
    //logging
    app.use(logger_1.expressLogger);
    //Mount routers, appi calls
    //The first parameter is the name of the path and the 2nd is the file to use if an Api call with that path is received
    //For example
    // /api/v1/users/getUsername would be in the users.
    app.use('/api/v1/users', user_1.default);
    app.use('/api/v1/archives', archives_1.default);
    app.use('/api/v1/catalogs', catalogs_1.default);
    //app.use('/api/v1/roles',roles)
    app.use('/api/v1/test', testApi_1.default);
    app.use('/api/v1/images', image_1.default);
    app.use('/api/v1/questionset', questionSet_1.default);
    // This handles errors that happen during API calls
    app.use(error_1.errorHandler);
    //Only pages with /auth at the beginning need to be restricted
    app.use("/auth/*", restrictAccess);
    //Everything else is a webpage
    app.get('*', (req, res) => {
        return handle(req, res);
    });
    //Get the port and have the site on that port
    const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
    const server = app.listen(PORT, () => {
        //log.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        //log.error('TEST')
        //@ts-ignore
        colorize_1.default.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        //console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold.underline)
    });
    //Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
        var _a;
        // console.log(`Error: ${err?.message ?? 'undefined error'}`.red)
        colorize_1.default.error(`Error: ${(_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : 'undefined error'}`);
        //Exit server on fail
        server.close(() => {
            process.exit(1);
        });
    });
})
    .catch((ex) => {
    //If any error, exit
    console.error(ex.stack);
    process.exit(1);
});
