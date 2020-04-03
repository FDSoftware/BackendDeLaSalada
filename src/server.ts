require('dotenv').config();
import express = require('express');
import { getModules } from './utils/getModules';
var bodyParser = require('body-parser');
var routes = require("./routes");
var routesApiPost = require("./routes.api.post");
var routesApiGet = require("./routes.api.get");
var routesApiPut = require("./routes.api.put");
// Create a new express application instance
const app: express.Application = express();
// json modules:
console.log("modulos disponibles:");
console.log(getModules());

//Routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token');
  next();
});

app.use(routes); 
app.use(routesApiPost);
app.use(routesApiGet);
app.use(routesApiPut);
app.get('/', function (req, res) {
  //esto creo que lo podria borrar directamente
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5000, function () {
  console.log('no rompi nada en el puerto 5000!');
});