const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    content: { type: String, required: true, maxlength: 140 },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        validate: {
          validator: async function (userId) {
            console.log(this.likes.includes(userId));
            return !this.likes.includes(userId);
          },
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = tweetSchema;
