import React from 'react';
import App from "../src/Containers/App";
import Index from "../src/Components/Plugins/Index/Index";

const index = () => {
  return (
    <App page={"Home"}>
      <Index/>
    </App>
  )
}

export default index;