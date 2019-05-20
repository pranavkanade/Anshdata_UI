import React from "react";
import App from "../../src/Containers/App";
import Contrib from "../../src/Components/Plugins/Contrib/Contrib";

const contrib = () => {
  return (
    <App page={"Contrib"}>
      <Contrib />
    </App>
  );
};

export default contrib;
