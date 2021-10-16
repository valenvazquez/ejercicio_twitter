const passport = require("passport");
const { User } = require("../models");

const logIn = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/",
});

module.exports = {
  logIn,
};
