const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
  // likes: [Schema.Types.ObjectId],
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

userSchema.pre("save", async (next) => {
  const pass = this.password;
  console.log(pass);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = userSchema;
