const passport = require("passport");
const { User } = require("../models");

const logIn = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/",
});

function logOut(req, res) {
  req.logout();
  res.redirect("/landing");
}

module.exports = {
  logIn,
  logOut,
};
