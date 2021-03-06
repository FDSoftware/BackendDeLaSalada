export {}
var express = require("express");
var router = express.Router();
const { handleToken } = require("@utils/handleToken");
const { getModules } = require("@utils/getModules");
const fs = require("fs");

router.post("/endpoint/:key", function (req: any, res: any, next: any) {
  let data = handleToken(req, res);
  if (data !== -1) {
    var key = req.params.key;
    console.log(
      `el usuario '${data.name}' creara un nuevo endpoint en /apis/'${key}'`
    );
    /* ----------- Filtramos request para ver si ya existe el modulo  -------- */
    let module_name = getModules().find((e: string) => e === `${key}.json`);
    if (!module_name) {
      fs.writeFile(
        "apis/" + `${key}.json`,
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
          status:
            "El modulo ya existe, use PUT para modificarlo o cree otro nuevo",
        })
        .end();
    }
  }
});

module.exports = router;
