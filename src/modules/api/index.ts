export {}
// importo todos mis middlewares:
const routesApiPost = require("./routes.post");
const routesApiGet = require("./routes.get");
const routesApiPut = require("./routes.put");
const routesApiDelete = require("./routes.delete");
// para combinar los middlewares
const { combineMiddleware } = require("@utils/combineMiddleware");

const apiRoutes = combineMiddleware([
  routesApiGet,
  routesApiPost,
  routesApiPut,
  routesApiDelete,
]);

module.exports = apiRoutes;
