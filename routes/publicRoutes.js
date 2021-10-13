const express = require("express");
const publicRouter = express.Router();
const { User } = require("../models");

publicRouter.get("/home", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
// Rutas del Públicas:
// ...

module.exports = publicRouter;
