import React from "react";

import Hero from "./HeroCard/HeroCard";

const index = props => {
  return (
    <div className={"IndexPlugin"}>
      <Hero explore="/courses" contribute="/contribute" />
      <br />
      <hr />
    </div>
  );
};

export default index;
