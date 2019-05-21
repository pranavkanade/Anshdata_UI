import React from "react";
import Link from "next/link";
import { Container, Grid, Button } from "semantic-ui-react";
import css from "./index.scss";

const index = props => {
  return (
    <div className={"IndexPlugin"}>
      <div className={`${css.hero}`}>
        <span className={css.heroMsg}>
          <b>Unlocking</b> the potential of online learning, together!
        </span>
        <div className={css.startBtnGrp}>
          <div className={css.exploreBtn}>
            <a href="/courses">
              <text>Start Exploring</text>
            </a>
          </div>
          <div className={css.separator} />
          <div className={css.contribBtn}>
            <a href="/contribute">
              <text>Contribute Now</text>
            </a>
          </div>
        </div>
        <div className={css.heroImg}>
          <img src="/static/Imgs/Homepage-Hero/teamwork.png" />
        </div>
      </div>
    </div>
  );
};

export default index;
