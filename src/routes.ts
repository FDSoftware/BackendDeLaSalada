/* esto lo separo en modulitos luego, es para sacarlo rapido*/
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
const clave = process.env.PASS; //esto va en el .env
const ronditas = 12;

//password pasada por bcrypt para probar:
const pwd = "$2b$12$1B0/tZGY04Y4hDFXrsKPQ.KzMafeUvuy7b8CDP33TdDzLCK6Y3FRy";

router.post("/login", async (req:any, res:any) => {
   const { username, password } = req.body
   //vamo a comparar la pwd:
   await bcrypt.compare(password, pwd)
    .then(function(samePassword: any) {
        if(!samePassword) {
          res.status(403).send();
      } 
  });

   const id = 3445;
   const token = jwt.sign(
    { username , 
        id 
    }, clave, {
     algorithm: 'HS256',
     expiresIn: 30000
   })
   console.log('token:', token);
   //res.cookie('token', token, { maxAge: 30000 * 1000 });
   res.send(`${token}`);
   res.end();
});


router.post("/signup", async (req:any, res:any) => {
    const { username, password } = req.body
    //vamo a comparar la pwd:
    await bcrypt.hash(password, ronditas)
  .then(function(hashedPassword: any) {
      console.log(hashedPassword);
  });
    res.send(`usa el login ahora!`);
    res.end();
 });


router.get("/app", (req:any, res:any) => { // servicio get de prueba
const token = req.header('x-auth-token');
if (!token) {
    return res.status(401).send('dame el JWT gato');
}

try {
    const decoded = jwt.verify(token, clave);
    req.user = decoded;
    console.log(decoded);
    res.send(`Welcome ${decoded.username}!`);
    res.end();
}
catch (ex) {
    res.status(400).send('Invalid JWT.');
}
});

module.exports = router;