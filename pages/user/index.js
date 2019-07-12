import React from "react";
import { useRouter } from "next/router";
import App from "../../src/Containers/App";
import User from "../../src/Components/Plugins/User/Index";

const index = props => {
  const router = useRouter();
  const { user_name } = router.query;
  console.log("User name ", user_name);
  return (
    <App page={"User"}>
      <User user_name={user_name} />
    </App>
  );
};

export default index;
