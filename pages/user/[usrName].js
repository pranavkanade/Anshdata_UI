import React from "react";
import { useRouter } from "next/router";
import User from "../../src/Components/Plugins/User/Index";

const index = props => {
  const router = useRouter();
  const { usrName } = router.query;
  console.log("User name ", usrName);
  return <User user_name={usrName} />;
};

export default index;
