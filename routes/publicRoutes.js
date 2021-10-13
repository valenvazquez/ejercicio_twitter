const express = require("express");
const publicRouter = express.Router();
const { User } = require("../models");

publicRouter.get("/home", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

publicRouter.get("/home");

publicRouter.get("/about-us");

publicRouter.get("/");

publicRouter.get("/:username");

publicRouter.get("/:username/:tweetId");

//crear el tweet
publicRouter.post("/tweet");

publicRouter.post("/register");

publicRouter.post("/tweet/like/:id");

publicRouter.post("/login-authorization");

publicRouter.delete("/tweet/:id");

publicRouter.delete("/:username");

publicRouter.delete("/tweet/like/:id");

publicRouter.patch("/:username");

module.exports = publicRouter;
