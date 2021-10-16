const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "username", passwordField: "password" }, async function (
      username,
      password,
      done,
    ) {
      try {
        const user = await User.findOne({ username });
        if (user === null || !(await user.validatePassword(password))) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );
};
