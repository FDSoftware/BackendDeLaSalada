// lib/app.ts
import express = require('express');

var bodyParser = require('body-parser');
var routes = require("./routes");


// Create a new express application instance
const app: express.Application = express();

//Routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(routes); 

app.get('/', function (req, res) {
  //esto creo que lo podria borrar directamente
  res.send('Hello World!');
});

app.listen(process.env.PORT || 5000, function () {
  console.log('no rompi nada en el puerto 5000!');
});