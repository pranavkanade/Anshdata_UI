import React, { Component } from "react";
import Link from "next/link";
import css from "./WorkingBox.scss";
import ReactPlayer from "react-player";

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
            <ReactPlayer
              url={"https://www.youtube.com/embed/RKLKib4bHhA"}
              controls
              pip={true}
              height="100%"
              width="100%"
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
