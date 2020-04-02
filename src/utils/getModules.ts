//para leer la data:
const fs = require("fs");

export const getModules = () =>
  fs.readdirSync("./apis").filter((file: string) => file.endsWith(".json"));
