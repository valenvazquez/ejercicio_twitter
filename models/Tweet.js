const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [Schema.Types.ObjectId],
});

module.exports = mongoose.model("Tweet", tweetSchema);
