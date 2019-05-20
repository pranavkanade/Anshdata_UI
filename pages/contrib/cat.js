import React from "react";
import App from "../../src/Containers/App";
import Category from "../../src/Components/Plugins/Contrib/Category/Cat";

const contribCategory = props => {
  return (
    <App page={"ContribCategory"}>
      <Category />
    </App>
  );
};

export default contribCategory;
