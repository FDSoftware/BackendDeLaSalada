var express = require("express");
var router = express.Router();
// utils propias
const { readJSON } = require("@utils/handleJson");

router.get("/api/post", function(req, res, next) {
  const data = readJSON();
  try {
    res
      .status(200) // OK
      .json({ count: data.length, data: data })
      .end();
  } catch (ex) {
    res
      .status(500)
      .json({ error: "error con el json", debug: ex.message })
      .end();
  }

  res
    .status(404)
    .send()
    .end();
});

module.exports = router;
