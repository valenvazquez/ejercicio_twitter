const mongoose = require("mongoose");
const { User, Tweet } = require("./models");

module.exports = async () => {
  mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`);
  mongoose.connection
    .once("open", () => console.log("[Mongoose] Conexión con la base de datos establecida"))
    .on("error", (error) => console.log(error));

  //   await User.deleteMany();
  //   userSeeder();
};
