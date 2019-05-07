const routes = require("next-routes")();

routes.add("/", "/").add("/courses/:id", "/courses/detailed");

module.exports = routes;
