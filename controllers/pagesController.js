const { User, Tweet } = require("../models");

async function showHome(req, res) {
  const users = await User.find().limit(5);
  const tweets = await Tweet.find()
    .sort("-createdAt")
    .limit(20)
    .populate({ path: "user", select: "firstname lastname username profilePhoto -_id" });
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
  showContact,
  showAboutUs,
  showLanding,
};
