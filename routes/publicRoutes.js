const express = require("express");
const publicRouter = express.Router();
const { User } = require("../models");
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");
const likeController = require("../controllers/likeController");
const authController = require("../controllers/authController");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");

// ---------- PAGES ------------ //
publicRouter.get("/home", pagesController.showHome);
publicRouter.get("/", redirectIfAuthenticated, pagesController.showLanding);
publicRouter.get("/about-us");

// ---------- USERS ------------ //
publicRouter.get("/:username", userController.show);
publicRouter.post("/register", userController.store);
publicRouter.post("/login", authController.logIn);
publicRouter.delete("/:username");
publicRouter.patch("/:username");

// ---------- TWEETS ------------ //
publicRouter.get("/:username/:tweetId");
publicRouter.post("/tweet", tweetController.store);
publicRouter.delete("/tweet/:id");

// ---------- LIKES ------------ //
publicRouter.post("/tweet/like/:id", likeController.store);
publicRouter.delete("/tweet/like/:id", likeController.destroy);

// ---------- APIs ------------ //
publicRouter.get("/api/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in
    res.json({});
  } else {
    res.json({
      user: req.user,
    });
  }
});

module.exports = publicRouter;
