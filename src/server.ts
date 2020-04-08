// dotenv y alias para los import con @
require("dotenv").config();
require("module-alias/register");
// express
import express = require("express");
const app: express.Application = express();
var bodyParser = require("body-parser");
//primero middleware de bodyParser para poder tener en el json del body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));

// rutas:
const apiRoutes = require("./modules/api");
const loginRoutes = require("./modules/login");
const endpointRoutes = require("./modules/endpoint");
const searchRoutes = require("./modules/search");
const { getModules } = require ("@utils/getModules");

// json modules:
console.log("modulos disponibles:");
console.log(getModules());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// setup modulos:
app.use(loginRoutes);
app.use(apiRoutes);
app.use(endpointRoutes);
app.use(searchRoutes);

app.get("/", function (req, res) {
  res.json({ status: "Hello World!" });
});

app.listen(process.env.PORT || 5000, function () {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT || 5000}!`);
});
