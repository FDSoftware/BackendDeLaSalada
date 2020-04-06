export {}
// importo todos mis middlewares:
const routesEnpointPost = require("./routes.post");
const routesEnpointDelete = require("./routes.delete");
const routesEnpointPut = require("./routes.put");
// para combinar los middlewares
const { combineMiddleware } = require("@utils/combineMiddleware");

const endpointRoutes = combineMiddleware([
  routesEnpointPost,
  routesEnpointDelete,
  routesEnpointPut,
]);

module.exports = endpointRoutes;
