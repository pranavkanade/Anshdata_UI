const routes = require("next-routes")();

routes
  .add("/", "/")
  .add("/courses/:id", "/courses/detailed")
  .add("/courses/attend/:id", "/courses/attend")
  .add("/contribute/draft/:id", "/contribute/draft")
  .add("/u/:user_name", "/user");

module.exports = routes;
