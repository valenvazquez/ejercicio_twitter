const { User, Tweet } = require("../models");
const _ = require("lodash");

async function showHome(req, res) {
  let users = await User.find().limit(60);
  users = _.sampleSize(users, 3);
  const tweets = await Tweet.find({ user: { $in: req.user.following } })
    .sort("-createdAt")
    .limit(20)
    .populate({ path: "user", select: "firstname lastname username profile" });
  res.render("home", { tweets, users });
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function showLanding(req, res) {
  res.render("landing");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showAboutUs,
  showLanding,
};
