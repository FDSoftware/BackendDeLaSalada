export {}
// importo todos mis middlewares:
const routesLoginPost = require("./routes.post");
// para combinar los middlewares
const { combineMiddleware } = require("@utils/combineMiddleware");
const loginRoutes = combineMiddleware([routesLoginPost]);

module.exports = loginRoutes;
