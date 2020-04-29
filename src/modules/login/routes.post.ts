import { randomBytes } from "crypto";

const { getJWT_body } = require("@utils/jwt-body");
/* esto lo separo en modulitos luego, es para sacarlo rapido*/
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const saltRounds = 12;
/* el certificado RS256 esta pasado por base64 para poder guardarlo en un .env*/
const rawpass = process.env.PASS ? process.env.PASS : "test"; //esto va en el .env
const buff = Buffer.from(rawpass, "base64");
const clave = buff.toString("ascii");

//password pasada por bcrypt para probar:
const pwd = "$2b$12$gdqaZlCcOh0DWyrfh45wSOEUeDh6PjNYklu7iLlcsjbklchudwypq";

router.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;
  //vamo a comparar la pwd:
  await bcrypt.compare(password, pwd).then(function (samePassword: any) {
    if (!samePassword) {
      res.status(403).send("no passwd");
    }
  });
  const b64 = Buffer.from(
    JSON.stringify({
      username: username,
      password: password,
      id: randomBytes(45),
    })
  ).toString("base64");

  const db64 = JSON.parse(Buffer.from(b64, "base64").toString());
  //socotroco decodificado:
  console.log(db64.username);

  const token = jwt.sign(getJWT_body(username), clave, { algorithm: "RS256" });
  let response = {
    access_token: token,
    expires_in: 300,
    token_type: "Bearer",
    refresh_token: b64,
    scope: "dds_be openid",
  };
  res.set("Content-Type", "application/json").json(response).end();
});

router.post("/signup", async (req: any, res: any) => {
  const { username, password } = req.body;
  //vamo a comparar la pwd:
  await bcrypt.hash(password, saltRounds).then(function (hashedPassword: any) {
    console.log(hashedPassword);
  });
  res.send(`usa el login ahora! ${username}`).end();
});

router.post("/refresh", async (req: any, res: any) => {
  const { refresh_token } = req.body;

  //extraemos el username y el password del refresh_token
  const { username, password } = JSON.parse(
    Buffer.from(refresh_token, "base64").toString()
  );

  //vamo a comparar la pwd:
  await bcrypt.compare(password, pwd).then(function (samePassword: any) {
    if (!samePassword) {
      res.status(403).send("no passwd");
    }

    //creamos nuevo refresh token
    const b64 = Buffer.from(
      JSON.stringify({
        username: username,
        password: password,
        id: randomBytes(45),
      })
    ).toString("base64");

    // creamos y firmamos el nuevo JWT
    const token = jwt.sign(getJWT_body(username), clave, {
      algorithm: "RS256",
    });
    let response = {
      access_token: token,
      expires_in: 300,
      token_type: "Bearer",
      refresh_token: b64,
      scope: "dds_be openid",
    };
    //enviamos la response con el JWT y el refresh_token
    res.set("Content-Type", "application/json").json(response).end();
  });
});

module.exports = router;
