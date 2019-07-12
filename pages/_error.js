import React from "react";
import App from "../src/Containers/App";
import Error from "../src/Components/Generic/Error/error";

const PageNotFound = props => {
  return (
    <App page={"Platform"}>
      <Error />
    </App>
  );
};

export default PageNotFound;
