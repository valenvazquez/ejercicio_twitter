const mongoose = require("mongoose");
const { User, Tweet } = require("./models");
const userSeeder = require("./seeders/userSeeder");
const tweetSeeder = require("./seeders/tweetSeeder");
const likeSeeder = require("./seeders/likeSeeder");
const followerSeeder = require("./seeders/followerSeeder");

module.exports = async () => {
  // mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`);
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  mongoose.connection
    .once("open", () => console.log("[Mongoose] Conexión con la base de datos establecida"))
    .on("error", (error) => console.log(error));

  // await User.deleteMany();
  // await Tweet.deleteMany();
  // await userSeeder();
  // await tweetSeeder();
  // await likeSeeder();
  // await followerSeeder();
};
