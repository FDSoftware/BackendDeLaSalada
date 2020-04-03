import { getJWT_body } from "./utils/jwt-body";
/* esto lo separo en modulitos luego, es para sacarlo rapido*/
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const ronditas = 12;
/* el certificado RS256 esta pasado por base64 para poder guardarlo en un .env*/
const rawpass = process.env.PASS ? process.env.PASS : "test"; //esto va en el .env
const buff = new Buffer(rawpass, "base64");
const clave = buff.toString("ascii");

//password pasada por bcrypt para probar:
const pwd = "$2b$12$gdqaZlCcOh0DWyrfh45wSOEUeDh6PjNYklu7iLlcsjbklchudwypq";

router.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;
  //vamo a comparar la pwd:
  await bcrypt.compare(password, pwd).then(function(samePassword: any) {
    if (!samePassword) {
      res.status(403).send("no passwd");
    }
  });

  const token = jwt.sign(getJWT_body(username), clave, { algorithm: "RS256" });
  let response = {
    access_token: token,
    expires_in: 30000,
    token_type: "Bearer",
    scope: "dds_be openid"
  };
  res
    .set("Content-Type", "application/json")
    .json(response)
    .end();
});

router.post("/signup", async (req: any, res: any) => {
  const { username, password } = req.body;
  //vamo a comparar la pwd:
  await bcrypt.hash(password, ronditas).then(function(hashedPassword: any) {
    console.log(hashedPassword);
  });
  res.send(`usa el login ahora! ${username}`).end();
});

module.exports = router;
