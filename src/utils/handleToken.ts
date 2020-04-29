var jwt = require("jsonwebtoken");

/* el certificado RS256 esta pasado por base64 para poder guardarlo en un .env*/
const rawpass = process.env.PASS ? process.env.PASS : "test"; //esto va en el .env
const buff =  Buffer.from(rawpass, "base64");
const clave = buff.toString("ascii");

export const handleToken = (req: any, res: any) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    res.status(403).json({ error: "no hay JWT" }).end();
    return -1;
  }
  try {
    const decoded = jwt.decode(token, clave, {
      algorithms: ["RS256"],
    });
    if (decoded === null) {
      res.status(401).json({ error: "JWT caducado / invalido" }).end();
      return -1;
    }
    return decoded;
  } catch (ex) {
    console.log(ex);
    res
      .status(400)
      .json({ error: "JWT caducado / invalido", debug: ex.message })
      .end();
    return -1;
  }
};
