import express from "express";
import passport from "passport";

const router = express.Router();

//What to do if we enter the login route
router.get("/login", passport.authenticate("auth0", {
  scope: "openid email profile"
}), (req, res) => res.redirect("/"));

//WHen callback is called, either take user to tagImage if successful ,or login if fail
router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0",  (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");//on login fail
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/auth/auth1");//on successful login
    });
  })(req, res, next);
});

//What to do on logout
router.get("/logout", (req, res) => {
  req.logout();

  const {AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL} = process.env;
  res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`);
});

export {
    router as authRoutes
}