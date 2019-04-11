const routes = require("next-routes")();

routes
  .add("/", "/")
  .add("/courses", "/Courses")
  .add("/contrib", "/Contribute")
  .add("/contrib/course", "/contrib/Course")
  .add("/dashboard", "/Dashboard")
  .add("/profile", "/Profile")
  .add("/:id", "/");

module.exports = routes;
