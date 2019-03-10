const routes = require("next-routes")();

routes.add("/", "/").add("/:id", "/");

module.exports = routes;
