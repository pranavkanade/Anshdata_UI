import React, { Component } from "react";
import Link from "next/link";
import css from "./WorkingBox.scss";

export default props => {
  return (
    <div className={css.container}>
      <div className={css.grid}>
        <div>
          <span>How It Works?</span>
          <div className={css.actions} />
        </div>
        <div>
          <div className={css.introClip}>
            <iframe
              src="https://www.youtube.com/embed/RKLKib4bHhA"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <button>Join Now</button>
        </div>
      </div>

      <div />
    </div>
  );
};
