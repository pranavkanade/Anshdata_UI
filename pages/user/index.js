import React from "react";
import { useRouter } from "next/router";
import User from "../../src/Components/Plugins/User/Index";

const index = props => {
  const router = useRouter();
  const { user_name } = router.query;
  console.log("User name ", user_name);
  return <User user_name={user_name} />;
};

export default index;
