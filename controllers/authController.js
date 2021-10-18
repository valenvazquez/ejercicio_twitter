const passport = require("passport");

const logIn = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/",
});

function logOut(req, res) {
  req.logout();
  res.redirect("/");
}

module.exports = {
  logIn,
  logOut,
};
