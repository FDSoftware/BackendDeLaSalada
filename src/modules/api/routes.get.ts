export {}
var express = require("express");
var router = express.Router();
const { handleToken } = require("@utils/handleToken");
const { getModules } = require("@utils/getModules");
const fs = require("fs");

router.get("/api/:key", function (req: any, res: any, next: any) {
  let data = handleToken(req, res);
  if (data !== -1) {
    var key = req.params.key;
    console.log(`el usuario '${data.name}' pidio el elemento '${key}'`);
    /* -------------- buscamos los modulos en el directorio ----------------------*/
    let module_name = getModules().find((e: string) => e === `${key}.json`);
    if (!module_name) {
      res.status(404).json({ erro: "No se encuentra el endpoint json" }).end();
      return;
    }
    /* ahora leemos el json y lo devolvemos*/
    try {
      const jsonRAW = fs.readFileSync("apis/" + module_name);
      let jsonData = JSON.parse(jsonRAW);
      res
        .status(200) // OK
        .json(jsonData) // aca tendria que enviar todo el payload
        .end(); // cierra comunicacion
    } catch (ex) {
      res
        .status(500)
        .json({ error: "error con el json del endpoint", debug: ex.message })
        .end();
    }
  }
  res.status(404).send().end();
});

module.exports = router;
