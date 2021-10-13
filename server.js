require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

const session = require("express-session");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

dbInitialSetup();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

// dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () =>
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}!\n`),
);
