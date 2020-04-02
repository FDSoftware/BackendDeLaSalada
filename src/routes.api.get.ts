var express = require("express");
var router = express.Router();

import { handleToken } from "./utils/handleToken";
import { getModules } from "./utils/getModules";
const fs = require("fs");

router.get("/api/:key", function(req: any, res: any, next: any) {
  let data = handleToken(req, res);
  res.header('Access-Control-Allow-Origin', '*');
  if (data !== -1) {
    var key = req.params.key;
    console.log(`el usuario '${data.name}' pidio el elemento '${key}'`);
    /* -------------- buscamos los modulos en el directorio ----------------------*/
    const modules = getModules();
    /* ----------- Filtramos request para ver si coincide con los modulos-------- */
    let module_name = modules.find((e: string) => e === `${key}.json`);
    if (!module_name) {
      next();
      return;
    }
    /* ahora leemos el json y lo devolvemos*/
    const jsonRAW = fs.readFileSync("apis/" + module_name);
    let jsonData = JSON.parse(jsonRAW);
    res
      .status(200) // OK
      .json(jsonData) // aca tendria que enviar todo el payload
      .end(); // cierra comunicacion
  }
  res
    .status(404)
    .send()
    .end();
});

module.exports = router;
