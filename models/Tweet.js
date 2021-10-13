const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

module.exports = tweetSchema;
