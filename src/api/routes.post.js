// Express
var express = require("express");
var router = express.Router();
// Multer
const multer = require("multer");
//fs
const fs = require("fs");
const path = require("path");
// utils propias
const { readJSON, writeJSON, getLastPostID } = require("@utils/handleJson");
const { uuidv4 } = require("@utils/uuid");

//Usamos multer para manejar la subida de archivos
const upload = multer({
  dest: __dirname + "/temp",
});

router.post(
  "/api/post",
  upload.single("image"), // en este caso el campo "file" tiene el id "image"
  (req, res) => {
    const ext = path.extname(req.file.originalname).toLowerCase();
    const allowFiles = [".jpg", ".gif"]; // array con archivos permidos
    const tempPath = req.file.path;
    const imageUUID = uuidv4(); // UUID de la imagen
    const targetPath = path.join(
      __dirname,
      "../data/images/" + imageUUID + ext
    );

    if (allowFiles.filter((e) => e === ext)) {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) {
          console.log(err);
          return res.status(403);
        }
      });
      /* ahora leemos el json*/
      let jsonData = readJSON();
      /* push furioso:*/
      jsonData.push({
        ...req.body,
        image: imageUUID + ext,
        order: getLastPostID() + 1,
      });
      writeJSON(jsonData);
      res
        .status(200) // OK
        .json({ status: "Informacion actualizada correctamente" })
        .end(); // cierra comunicacion
    } else {
      fs.unlink(tempPath, (err) => {
        res
          .status(403)
          .contentType("text/plain")
          .end("file not allowed");
      });
    }
  }
);

module.exports = router;
