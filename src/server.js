// dotenv y alias para los import con @
require("dotenv").config();
require("module-alias/register");
// express
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

//primero middleware de bodyParser para poder tener en el json del body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// rutas:
const apiRoutes = require("./api");

// setup modulos:
app.use(apiRoutes);

app.get("/", function (req, res) {
  res.json({ status: "Hello World!" });
});

app.listen(process.env.PORT || 5000, function () {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT || 5000}!`);
});
