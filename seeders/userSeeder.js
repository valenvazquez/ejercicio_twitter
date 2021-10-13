const faker = require("faker");
const { User } = require("../models");

faker.locale = "en";

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email().toLowerCase(),
      username: faker.internet.userName(),
      password: "hola",
      bio: faker.lorem.paragraphs(2),
      profilePhoto: faker.internet.avatar(),
      // tweetList: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: "Tweet",
      //   },
      // ],
      // likes: [Schema.Types.ObjectId],
      // followers: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: "User",
      //   },
      // ],
      // following: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: "User",
      //   },
      // ],
    });
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de User.");
};
