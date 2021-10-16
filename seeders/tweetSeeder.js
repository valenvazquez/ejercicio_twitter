const faker = require("faker");
const { Tweet, User } = require("../models");
const _ = require("lodash");

faker.locale = "en";

module.exports = async () => {
  const users = await User.find();
  const tweets = [];

  for (let i = 0; i < 10; i++) {
    tweets.push({
      content: faker.lorem.sentence().substring(0, 139),
      user: _.sample(users),
    });
  }
  await Tweet.insertMany(tweets);

  for (const user of users) {
    const tweets = await Tweet.find({ user });
    user.tweets = tweets;
    await user.save();
  }

  console.log("[Database] Se corrió el seeder de Tweet.");
};
