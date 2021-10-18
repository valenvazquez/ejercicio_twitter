const faker = require("faker");
const { User } = require("../models");

faker.locale = "en";

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    let user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email().toLowerCase(),
      username: faker.internet.userName() + i,
      password: "hola",
      bio: faker.lorem.paragraphs(2),
      profile: faker.internet.avatar(),
    });
    await user.save();
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de User.");
};
