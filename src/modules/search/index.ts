export {}
// importo todos mis middlewares:
const routesSearchPost = require("./routes.post");
//const routesEnpointGet = require("./routes.get");
//const routesEnpointPut = require("./routes.put");
// para combinar los middlewares
const { combineMiddleware } = require("@utils/combineMiddleware");

const searchRoutes = combineMiddleware([
    routesSearchPost,
  //routesEnpointGet,
  //routesEnpointPut,
]);

module.exports = searchRoutes;
