import React from "react";
import App from "../src/Containers/App";
import Platform from "../src/Components/Plugins/Platform/platform";

const PlatformPage = props => {
  return (
    <App page={"Platform"}>
      <Platform />
    </App>
  );
};

export default PlatformPage;
