import React from "react";
import App from "../src/Containers/App";
import Contribute from "../src/Components/Plugins/Contribute/Contribute";

const contribute = () => {
  return (
    <App page={"Contribute"}>
      <Contribute />
    </App>
  );
};

export default contribute;
