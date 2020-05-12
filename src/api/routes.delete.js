const express = require("express");
const router = express.Router();
// utils propias
const { readJSON, writeJSON } = require("@utils/handleJson");

router.delete("/api/post/:key/", function(req, res, next) {
  const key = req.params.key; //modulo a modificar
  const data = readJSON();
  let jsonFilter = [];
  jsonFilter = data.filter((e) => e.order != key);
  writeJSON(jsonFilter);

  res
    .status(200) // OK
    .json({ status: "Informacion actualizada correctamente" })
    .end(); // cierra comunicacion
});

module.exports = router;
