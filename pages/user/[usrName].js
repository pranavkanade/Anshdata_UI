import React from "react";
import User from "../../src/Components/Plugins/User/Index";

const index = props => {
  return <User user_name={props.usrName} />;
};

index.getInitialProps = async ({ query }) => {
  const ursName = query.ursName;
  return { ursName: ursName };
};

export default index;
