import React from "react";
import Link from "next/link";
import css from "./HeroCard.scss";
import { Button } from "rsuite";

export default props => {
  return (
    <>
      <div className={css.container}>
        <div className={css.heroCard}>
          <div>
            <div className={css.tag}>
              <h1>Education platform that is <span>Free</span> and <span>Open</span> for everyone!</h1>
            </div>
            <div className={css.heroBtns}>
              <Link href="/courses">
                <Button className={css.exploreBtn}>Start Exploring</Button>
              </Link>
              <span/>
              <Link href="/contribute">
                <Button className={css.contributeBtn}>Contribute Now</Button>
              </Link>
            </div>
          </div>
          <img className={css.landingImg} src="/static/Imgs/Homepage-Hero/teamwork.png"/>
          <img className={css.bg} src="/static/assets/bg/landing-hero-bg.svg"/>
        </div>
      </div>
    </>
  );
};
