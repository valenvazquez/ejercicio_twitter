const express = require("express");
const publicRouter = express.Router();
const { User } = require("../models");
const pagesController = require("../controllers/pagesController");

publicRouter.get("/home", pagesController.showHome);

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
