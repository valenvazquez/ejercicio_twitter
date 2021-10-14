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
        //seguimos aca
        if (user === null || !user.validatePassword(password)) {
          return done(null, false, { message: "Incorrect credentials." });
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }),
  );
};
