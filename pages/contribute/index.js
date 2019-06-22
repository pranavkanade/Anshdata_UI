import React from "react";
import App from "../../src/Containers/App";
import Contribute from "../../src/Components/Plugins/Contribute/contribute";

const contrib = () => {
  return (
    <App page={"Contribute"}>
      <Contribute />
    </App>
  );
};

export default contrib;
