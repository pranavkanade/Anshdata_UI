const routes = require("next-routes")();

routes
  .add("/", "/")
  .add("/courses/:id", "/courses/detailed")
  .add("/courses/attend/:id", "/courses/attend")
  .add("/contrib/course/:id", "/contrib/course")
  .add("/u/:user_name", "/user");

module.exports = routes;
