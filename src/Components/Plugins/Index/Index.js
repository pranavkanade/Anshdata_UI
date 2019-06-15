import React from "react";

import css from "./index.scss";

import Hero from "./HeroCard/HeroCard";
import WorkingBox from "./WorkingBox/WorkingBox";

const index = props => {
  return (
    <div className={"IndexPlugin"}>
      <div className={css.landing}>
        <Hero explore="/courses" contribute="/contribute" />
        <img
          className={css.backWorking}
          src="../../../../../static/assets/back/howWorks.svg"
        />
        <WorkingBox />
      </div>
    </div>
  );
};

export default index;
