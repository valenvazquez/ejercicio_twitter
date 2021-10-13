const faker = require("faker");
const { Tweet, User } = require("../models");

faker.locale = "en";

//no me puedo seguir a mi mismo
// no pueden haber usuarios repetidos en cada lista

module.exports = async () => {
  const users = await User.find();
  const usersFive = await User.find().limit(5);

  for (let user of users) {
    const usersFollow = usersFive.filter((u) => user.id !== u.id);

    user.followers = usersFollow;
    user.following = usersFollow;
    user = await user.save();
  }

  console.log("[Database] Se corrió el seeder de Follower.");
};
