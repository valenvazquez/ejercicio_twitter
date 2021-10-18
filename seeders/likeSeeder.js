const faker = require("faker");
const _ = require("lodash");
const { Tweet, User } = require("../models");

faker.locale = "en";

module.exports = async () => {
  const users = await User.find().limit(20);
  const tweets = await Tweet.find().limit(50);

  //agregamos los mismo 5 usuarios a los likes - ver mejor manera de resolverlo
  for (const tweet of tweets) {
    const randomNum = Math.floor(Math.random() * 20 + 1);
    tweet.likes = _.sampleSize(users, randomNum);
    await tweet.save();
  }

  //await Tweet.save(tweets);
  console.log("[Database] Se corrió el seeder de Like.");
};
