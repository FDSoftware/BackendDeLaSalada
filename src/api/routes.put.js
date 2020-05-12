var express = require("express");
var router = express.Router();
const { getModules, modifyOrder, writeJSON } = require("@utils/getModules");

router.put("/api/post/:key", function(req, res, next) {
  //sin implementar
  /*  jsonData.map((e, index) => {
    if (e.id == req.body.id) {
      jsonData[index] = req.body;
    }
  }); */

  res
    .status(200) // OK
    .json({ status: "Informacion actualizada correctamente" })
    .end(); // cierra comunicacion
});

router.put("/api/order/:key:/key2", function(req, res, next) {
  var key = req.params.key; //Orden anterior
  var key2 = req.params.key2; //Orden nuevo
  const data = modifyOrder(key, key2);
  writeJSON(data);
  res
    .status(200) // OK
    .json({ status: "Informacion actualizada correctamente" })
    .end(); // cierra comunicacion
});

module.exports = router;
