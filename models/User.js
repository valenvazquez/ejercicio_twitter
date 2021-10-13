const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: String,
  password: String,
  bio: String,
  profilePhoto: String,
  tweetList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  likes: [Schema.Types.ObjectId],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
