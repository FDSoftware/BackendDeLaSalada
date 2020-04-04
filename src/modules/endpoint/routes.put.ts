var express = require("express");
var router = express.Router();
import { handleToken } from "../../utils/handleToken";
import { getModules } from "../../utils/getModules";
const fs = require("fs");

router.put("/endpoint/:key", function (req: any, res: any, next: any) {
  let data = handleToken(req, res);
  if (data !== -1) {
    var key = req.params.key;
    console.log(
      `el usuario '${data.name}' creara un nuevo endpoint en /apis/'${key}'`
    );
    /* ----------- Filtramos request para ver si ya existe el modulo  -------- */
    let module_name = getModules().find((e: string) => e === `${key}.json`);
    if (module_name) {
      fs.writeFile(
        "apis/" + module_name,
        JSON.stringify(req.body),
        "utf8",
        (err: any) => {
          if (err) res.status(500).json({ error: err }).end();
        }
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
