export {}
var express = require("express");
var router = express.Router();
const { handleToken } = require("@utils/handleToken");
const { getModules } = require("@utils/getModules");
const fs = require("fs");

router.delete("/endpoint/:key", function (req: any, res: any, next: any) {
  let data = handleToken(req, res);
  if (data !== -1) {
    var key = req.params.key;
    console.log(
      `el usuario '${data.name}' eliminara un enpoint en /apis/'${key}'`
    );
    /* ----------- Filtramos request para ver si ya existe el modulo  -------- */
    let module_name = getModules().find((e: string) => e === `${key}.json`);
    if (module_name) {
      fs.unlinkSync(
        "apis/" + module_name
      );
      res
        .status(200) // OK
        .json({ status: "Informacion actualizada correctamente" })
        .end();
    } else {
      res
        .status(500)
        .json({
          status: "El modulo no existe, use POST para crearlo",
        })
        .end();
    }
  }
});

module.exports = router;
