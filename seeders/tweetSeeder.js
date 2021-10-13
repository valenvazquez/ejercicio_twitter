const faker = require("faker");
const { Tweet, User } = require("../models");

faker.locale = "en";

module.exports = async () => {
  const users = await User.find();
  const tweets = [];

  for (let i = 0; i < 10; i++) {
    tweets.push({
      content: faker.lorem.sentence().substring(0, 139),
      user: users[Math.floor(Math.random() * users.length + 1)].id,
    });
  }

  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de Tweet.");
};
