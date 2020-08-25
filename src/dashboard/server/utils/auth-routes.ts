/*
  This file handles login,logout and what page to show when logging in
  If you search for @1 thats the page that will be shown on login
*/

import express from 'express'
import passport from 'passport'

const router = express.Router()

//What to do if we enter the login route
router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  }),
  (req, res) => res.redirect('/')
)

//WHen callback is called, either take user to tagImage if successful ,or login if fail
router.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user) => {
    //If there is an error, move on to the next middleware
    if (err) return next(err)

    //If no user property, that means theres no user logged in, so go back to the login page
    if (!user) return res.redirect('/login') //on login fail

    //Log the user that exists in
    req.logIn(user, (err) => {
      if (err) return next(err)
      //window.location.replace('/auth/home')
      res.redirect('/auth/home') //on successful login  @1
    })
  })(req, res, next)
})

//What to do on logout
router.get('/logout', (req, res) => {
  //Logout
  req.logout()

  //Redirect
  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL } = process.env
  res.redirect(
    `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`
  )
})

export { router as authRoutes }
