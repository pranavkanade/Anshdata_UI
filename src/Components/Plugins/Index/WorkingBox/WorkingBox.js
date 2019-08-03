import React from "react";
import Link from "next/link";
import css from "./WorkingBox.scss";
import ReactPlayer from "react-player";

const renderLearnInstructions = () => {
  return (
    <div className={css.list}>
      <p>1. Join "Anshdata"!</p>
      <p>2. Explore our course catalog.</p>
      <p>3. Enroll in a course you like...</p>
      <p>4. Easy .. Peasy .. 🤩!</p>
    </div>
  );
};

const renderConributeInstructions = () => {
  return (
    <div className={css.list}>
      <p>1. Join "Anshdata"!</p>
      <p>2. Create new course...</p>
      <p>3. Publish your awsome course.</p>
      <p>4. Done n Dusted 😎!</p>
    </div>
  );
};

export default props => {
  return (
    <div className={css.container}>
      <span className={css.title}>How It Works?</span>
      <div className={css.grid}>
        <div className={css.introClip}>
          <ReactPlayer
            url={"https://www.youtube.com/embed/RKLKib4bHhA"}
            controls
            pip={true}
            height="100%"
            width="100%"
          />
        </div>
        <div className={css.actionCards}>
          <div className={css.primary + " " + css.learn}>
            <h1 className={css.cardTitle}>Learn</h1>
            {renderLearnInstructions()}
            <Link>
              <a className={css.more}>Learn More...</a>
            </Link>
          </div>
          <div className={css.primary + " " + css.contrib}>
            <h2 className={css.cardTitle}>Contribute</h2>
            {renderConributeInstructions()}
            <Link>
              <a className={css.more}>Learn More...</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
