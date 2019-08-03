import React from "react";
import User from "../../src/Components/Plugins/User/Index";

const index = props => {
  return <User user_name={props.usrName} />;
};

index.getInitialProps = async ({ query }) => {
  const usrName = query.usrName;
  return { usrName: usrName };
};

export default index;
