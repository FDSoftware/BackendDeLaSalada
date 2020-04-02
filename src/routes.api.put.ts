var express = require("express");
var router = express.Router();

import { handleToken } from "./utils/handleToken";
import { getModules } from "./utils/getModules";
const fs = require("fs");

router.put("/api/:key", function(req: any, res: any, next: any) {
  let data = handleToken(req, res);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  if (data !== -1) {
    var key = req.params.key;
    let newdata = JSON.parse(req.body.new_data);
    console.log(
      `el usuario '${data.name}' pidio modificar el elemento '${key}'`
    );
    /* -------------- buscamos los modulos en el directorio ----------------------*/
    const modules = getModules();
    /* ----------- Filtramos request para ver si coincide con los modulos-------- */
    let module_name = modules.find((e: string) => e === `${key}.json`);
    if (!module_name) {
      next();
      return;
    }
    /* ahora leemos el json , editamos y devolvemos*/
    const jsonRAW = fs.readFileSync("apis/" + module_name);
    let jsonData = JSON.parse(jsonRAW);
    jsonData.map((e: any, index: number) => {
      if (e.id == newdata.id) {
        jsonData[index] = newdata;
      }
    });

    fs.writeFile(
      "apis/" + module_name,
      JSON.stringify(jsonData),
      "utf8",
      (err: any) => {
        if (err) res.status(500).json(err);
      }
    );

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
