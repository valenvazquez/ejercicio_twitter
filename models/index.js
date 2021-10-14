const mongoose = require("mongoose");
const userSchema = require("./User");
const tweetSchema = require("./Tweet");

const Tweet = mongoose.model("Tweet", tweetSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Tweet,
};
