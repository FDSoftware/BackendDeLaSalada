var express = require("express");
var router = express.Router();
import { handleToken } from "./utils/handleToken";
import { getModules } from "./utils/getModules";
const fs = require("fs");

router.post("/api/:key", function(req: any, res: any, next: any) {
  let data = handleToken(req, res);
  if (data !== -1) {
    var key = req.params.key;
    console.log(`el usuario '${data.name}' insertara elementos en '${key}'`);
    /* -------------- buscamos los modulos en el directorio ----------------------*/
    const modules = getModules();
    /* ----------- Filtramos request para ver si coincide con los modulos-------- */
    let module_name = modules.find((e: string) => e === `${key}.json`);
    if (!module_name) {
      next();
      return;
    }
    /* ahora leemos el json*/
    const jsonRAW = fs.readFileSync("apis/" + module_name);
    let jsonData = JSON.parse(jsonRAW);
    /* push furioso:*/
    jsonData.push(JSON.parse(req.body.new_data));
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
      .json({ status: "Informacion actualizada correctamente" })
      .end(); // cierra comunicacion
  }
  res
    .status(404)
    .send()
    .end();
});

module.exports = router;
