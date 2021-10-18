const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      validate: {
        validator: async function (email) {
          var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return re.test(email);
        },
        //  message: (props) => `${props.value} is already in use.`,
      },
      required: [true, "User email required"],
    },

    username: {
      type: String,
      validate: {
        validator: async function (username) {
          const user = await this.constructor.findOne({ username });
          return username !== "home" && username !== "about-us" && !user;
        },
        //  message: (props) => `${props.value} is already in use.`,
      },
      required: [true, "User username required"],
      min: [2, "Username must have at least 2 characters"],
      max: [30, "Username must have at least 30 characters"],
    },
    password: String,

    bio: String,
    profile: {
      type: String,
      default: "https://abs.twimg.com/sticky/default_profile_images/default_profile_x96.png",
    },
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        // validate: {
        //   validator: async function (userId) {
        //     return !this.followers.includes(userId);
        //   },
        // },
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        // validate: {
        //   validator: async function (userId) {
        //     return !this.following.includes(userId);
        //   },
        // },
      },
    ],
  },
  { timestamps: true },
);

// userSchema.path("username").validate(function (value, respond) {
//   var self = this;
//   return this.constructor
//     .findOneAsync({ username: value })
//     .then(function (username) {
//       if (username) {
//         if (self.username === user.username) {
//           console.log(user.username);
//           return respond(true);
//         }
//         return respond(false);
//       }
//       return respond(true);
//     })
//     .catch(function (err) {
//       throw err;
//     });
// }, "The specified username is already in use.");

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = userSchema;
