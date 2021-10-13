const express = require("express");
const publicRouter = express.Router();

publicRouter.get("/home", (req, res) => res.render("home.ejs"));
// Rutas del Públicas:
// ...

module.exports = publicRouter;
