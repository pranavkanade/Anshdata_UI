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
        <Hero />
        <img
          className={css.backWorking}
          src="../../../../static/assets/back/howWorks.svg"
        />
        <WorkingBox showAuthFormHandler={props.showAuthFormHandler} />
        <div className={css.topCourses}>
          <TopCourses />
        </div>
        <div className={css.partners}>
          <Partners />
        </div>

        <div className={css.testimonials}>
          <Testimonials />
        </div>

        <div className={css.mentions}>
          <Mentions />
        </div>
      </div>
    </div>
  );
};

export default index;
