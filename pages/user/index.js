import React from "react";
import App from "../../src/Containers/App";

const index = props => {
  return (
    <App page={"Home"}>
      <h3>{props.url.query.id}</h3>
    </App>
  );
};

export default index;
