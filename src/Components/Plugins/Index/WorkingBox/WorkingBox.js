import React, { Component } from "react";
import Link from "next/link";
import css from "./WorkingBox.scss";

export default props => {
  return (
    <div className={css.container}>
      <div className={css.grid}>
        <div className={css.primary}>
          <span>How It Works?</span>
          <div className={css.actions} />
        </div>
        <div className={css.secondary}>
          <div className={css.introClip}>
            <iframe
              src="https://www.youtube.com/embed/RKLKib4bHhA"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button onClick={() => props.showAuthFormHandler("signup")}>
            Join Now
          </button>
        </div>
      </div>

      <div />
    </div>
  );
};
