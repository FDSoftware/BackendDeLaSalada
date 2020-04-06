export {}
var express = require("express");
var router = express.Router();

const { handleToken } = require("@utils/handleToken");
const { getModules } = require("@utils/getModules");

const fs = require("fs");

router.put("/api/:key", function (req: any, res: any, next: any) {
  let data = handleToken(req, res);

  var key = req.params.key;
  let newdata = JSON.parse(req.body);
  console.log(`el usuario '${data.name}' pidio modificar el elemento '${key}'`);
  /* -------------- buscamos los modulos en el directorio ----------------------*/
  let module_name = getModules().find((e: string) => e === `${key}.json`);
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
});

module.exports = router;
