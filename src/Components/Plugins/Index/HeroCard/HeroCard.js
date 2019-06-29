import React, { Component } from "react";
import Link from "next/link";
import css from "./HeroCard.scss";

export default props => {
  return (
    <>
      <div className={css.container}>
        <div />
        <div className={css.heroCard}>
          <span>Unlocking the potential of Online Learning, Together!</span>
          <img src="./../../../../static/Imgs/Homepage-Hero/teamwork.png" />
        </div>
        <div />
        <div />
        <div className={css.heroBtns}>
          <Link href={props.explore}>
            <button className={css.exploreBtn}>Start Exploring</button>
          </Link>
          <span />
          <Link href={props.contribute}>
            <button className={css.contributeBtn}>Contribute Now</button>
          </Link>
        </div>
        <div />
      </div>
    </>
  );
};
