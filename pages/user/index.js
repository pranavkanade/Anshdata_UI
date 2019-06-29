import React from "react";
import App from "../../src/Containers/App";
import User from "../../src/Components/Plugins/User/Index";

const index = props => {
  return (
    <App page={"User"}>
      <User user_name={props.url.query.user_name} />
    </App>
  );
};

export default index;
