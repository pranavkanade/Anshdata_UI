import React from "react";
import Index from "../src/Components/Plugins/Index/Index";

const index = props => {
  return <Index {...props} />;
};

index.getInitialProps = async ({ showAuthFormHandler }) => {
  return { showAuthFormHandler };
};

export default index;
