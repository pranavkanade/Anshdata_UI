const routes = require("next-routes")();

routes
  .add("/", "/")
  .add("/courses/:id", "/courses/detailed")
  .add("/contrib/course/:id", "/contrib/course");

module.exports = routes;
