import { decode } from "punycode";

/* esto lo separo en modulitos luego, es para sacarlo rapido*/
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const clave = process.env.PASS; //esto va en el .env
const ronditas = 12;

//para leer la data:
const fs = require("fs");

let rawdata = fs.readFileSync("./test.json");

//password pasada por bcrypt para probar:
const pwd = "$2b$12$gdqaZlCcOh0DWyrfh45wSOEUeDh6PjNYklu7iLlcsjbklchudwypq";

// controla que el token no este vencido:
const handleToken = (req: any, res: any) => {
  const token = req.body.client_secret;
  if (!token) {
    res
      .status(403)
      .send("dame el JWT gato")
      .end();
    return -1;
  }
  try {
    const decoded = jwt.verify(token, clave);
    return decoded;
  } catch (ex) {
    res
      .status(400)
      .send("JWT caducado / invalido")
      .end();
    return -1;
  }
};

router.get("/api/:key", function(req: any, res: any, next: any) {
  let data = handleToken(req, res);
  if (data !== -1) {
    var key = req.params.key;
    console.log(`el usuario ${data.username} pidio el elemento ${key}`);

    let modules = ["purchase", "gpsfarma"];
    if (!modules.find(e => e === key)) {
      next();
      return;
    }
    res
      .status(200) // OK
      .send() // aca tendria que enviar todo el payload
      .end(); // cierra comunicacion
  }
  res
    .status(403)
    .send()
    .end();
});

router.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;
  //vamo a comparar la pwd:
  await bcrypt.compare(password, pwd).then(function(samePassword: any) {
    if (!samePassword) {
      res.status(403).send();
    }
  });

  const id = 3445; // id del usuario
  const token = jwt.sign({ username, id }, clave, {
    algorithm: "HS256",
    expiresIn: 30000
  });
  let response = {
    access_token: token,
    expires_in: 30000,
    token_type: "Bearer",
    scope: "dds_be openid"
  };
  res.set("Content-Type", "application/json");
  res.json(response);
  res.end();
});

router.post("/signup", async (req: any, res: any) => {
  const { username, password } = req.body;
  //vamo a comparar la pwd:
  await bcrypt.hash(password, ronditas).then(function(hashedPassword: any) {
    console.log(hashedPassword);
  });
  res.send(`usa el login ahora! ${username}`);
  res.end();
});

/* Ejemplo de auth + parse de data desde json */
router.get("/app", (req: any, res: any) => {
  // servicio get de prueba
  let student = JSON.parse(rawdata);
  console.log(student);

  const token = req.header("client_secret");
  if (!token) {
    return res.status(200).send(student);
  }

  try {
    const decoded = jwt.verify(token, clave);
    req.user = decoded;
    console.log(decoded);
    res.send(`Welcome ${decoded.username}!`);
    res.end();
  } catch (ex) {
    res.status(400).send("Invalid JWT.");
  }
});

module.exports = router;
