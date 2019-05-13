const routes = require("next-routes")();

routes
  .add("/", "/")
  .add("/courses/:id", "/courses/detailed")
  .add("/courses/attend/:id", "/courses/attend")
  .add("/contrib/course/:id", "/contrib/course")
  .add("/u/:id", "/user");

module.exports = routes;
