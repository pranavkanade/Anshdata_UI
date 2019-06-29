import React from "react";

import css from "./index.scss";

import Hero from "./HeroCard/HeroCard";
import WorkingBox from "./WorkingBox/WorkingBox";
import TopCourses from "./TopCourses/TopCourses";
import Partners from "./Partners/Partners";
import Testimonials from "./Testimonials/Testimonials";
import Mentions from "./Mentions/Mentions";

const index = props => {
  return (
    <div className={"IndexPlugin"}>
      <div className={css.landing}>
        <Hero explore="/courses" contribute="/contribute" />
        <img
          className={css.backWorking}
          src="../../../../static/assets/back/howWorks.svg"
        />
        <WorkingBox />
        <div className={css.topCourses}>
          <TopCourses />
        </div>
        <div>
          <img
            className={css.partners}
            src="../../../../static/assets/back/partners.svg"
          />
          <Partners />
        </div>

        <div className={css.testimonials}>
          <Testimonials explore="/courses" contribute="/contribute" />
        </div>

        <div>
          <img
            className={css.mentions}
            src="../../../../static/assets/back/mentions.png"
          />
          <Mentions />
        </div>
      </div>
    </div>
  );
};

export default index;
