const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");
const likeController = require("../controllers/likeController");
const authController = require("../controllers/authController");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");
const isAuthenticated = require("../middlewares/isAuthenticated");

// ---------- PAGES ------------ //
publicRouter.get("/home", isAuthenticated, pagesController.showHome);
publicRouter.get("/", redirectIfAuthenticated, pagesController.showLanding);
publicRouter.get("/about-us");

// ---------- USERS ------------ //
publicRouter.get("/:username", userController.show);
publicRouter.post("/register", redirectIfAuthenticated, userController.store);
publicRouter.post("/login", redirectIfAuthenticated, authController.logIn);
publicRouter.post("/logout", isAuthenticated, authController.logOut);
publicRouter.post("/follow/:id", isAuthenticated, userController.follow);
publicRouter.delete("/follow/:id", isAuthenticated, userController.unfollow);
publicRouter.delete("/:username");
publicRouter.patch("/:username");

// ---------- TWEETS ------------ //
publicRouter.get("/:username/:tweetId", tweetController.show);
publicRouter.post("/tweet", isAuthenticated, tweetController.store);
publicRouter.delete("/:username/:tweetId", isAuthenticated, tweetController.destroy);

// ---------- LIKES ------------ //
publicRouter.post("/tweet/like/:id", isAuthenticated, likeController.store);
publicRouter.delete("/tweet/like/:id", isAuthenticated, likeController.destroy);

module.exports = publicRouter;
