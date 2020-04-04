export {}
// importo todos mis middlewares:
const routesEnpointPost = require("./routes.post");
//const routesEnpointGet = require("./routes.get");
const routesEnpointPut = require("./routes.put");
// para combinar los middlewares
const { combineMiddleware } = require("@utils/combineMiddleware");

const endpointRoutes = combineMiddleware([
  routesEnpointPost,
  //routesEnpointGet,
  routesEnpointPut,
]);

module.exports = endpointRoutes;
