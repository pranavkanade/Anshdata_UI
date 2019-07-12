import React from "react";
import App from "../../src/Containers/App";
import Blog from "../../src/Components/Plugins/Blog/blog";

const blog = () => {
  return (
    <App page={"Home"}>
      <Blog />
    </App>
  );
};

export default blog;
