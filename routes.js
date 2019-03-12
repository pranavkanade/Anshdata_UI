const routes = require("next-routes")();

routes
  .add("/", "/")
  .add("/Dashboard", "/Dashboard")
  .add("/Profile", "/Profile")
  .add("/:id", "/");

module.exports = routes;
