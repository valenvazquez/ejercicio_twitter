const faker = require("faker");
const { Tweet, User } = require("../models");

faker.locale = "en";

module.exports = async () => {
  const users = await User.find().limit(5);
  const tweets = await Tweet.find();

  //agregamos los mismo 5 usuarios a los likes - ver mejor manera de resolverlo
  for (const tweet of tweets) {
    tweet.likes = users;
    await tweet.save();
  }

  //await Tweet.save(tweets);
  console.log("[Database] Se corrió el seeder de Like.");
};
