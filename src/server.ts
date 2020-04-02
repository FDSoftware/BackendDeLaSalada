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
app.use(routes); 
app.use(routesApiPost);
app.use(routesApiGet);
app.use(routesApiPut);
app.get('/', function (req, res) {
  //esto creo que lo podria borrar directamente
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5000, function () {
  console.log('no rompi nada en el puerto 5000!');
});