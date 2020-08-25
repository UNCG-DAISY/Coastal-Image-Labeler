import { Request, Response, NextFunction, Express } from 'express'

// 1 - importing dependencies
import session from 'express-session'
const MemoryStore = require('memorystore')(session)
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
import uid from 'uid-safe'
import { authRoutes } from './utils/auth-routes' //Handles login and logout

function initAuthentication(server: Express) {
  // 2 - add session management to Express
  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000, // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  }
  server.use(session(sessionConfig))

  // 3 - configuring Auth0Strategy
  const auth0Strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile)
    }
  )

  // 4 - configuring Passport
  passport.use(auth0Strategy)
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  // 5 - adding Passport and authentication routes
  server.use(passport.initialize())
  server.use(passport.session())
  server.use(authRoutes)

  // 6 - you are restricting access to some routes
  const restrictAccess = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) return res.redirect('/login')
    next()
  }

  return {
    restrictAccess,
  }
}

export { initAuthentication }
