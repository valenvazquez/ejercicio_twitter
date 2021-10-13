const session = require("express-session");
const passport = require("passport");
const localStrategy = require("./localstrategy");
const { User } = require("../models");

module.exports = (app) => {
  app.use(
    session({
      secret: "AlgúnTextoSuperSecreto",
      resave: false, // Docs: "The default value is true, but using the default has been deprecated".
      saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
      cookie: { maxAge: 1000 * 60 * 60 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  localStrategy(passport);

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, user);
    }
  });
};
