import React, { Component, useState } from "react";
import Link from "next/link";
import css from "./WorkingBox.scss";
import ReactPlayer from "react-player";
import { Nav } from "rsuite";

const renderLearnInstructions = () => {
  return (
    <React.Fragment>
      <p>
        <span>1.</span>Join "Anshdata"!
      </p>
      <p>
        <span>2.</span>Explore our course catalog.
      </p>
      <p>
        <span>3.</span>Enroll in a course you like...
      </p>
      <p>
        <span>4.</span>Easy .. Peasy .. 🤩!
      </p>
    </React.Fragment>
  );
};

const renderConributeInstructions = () => {
  return (
    <React.Fragment>
      <p>
        <span>1.</span>Join "Anshdata"!
      </p>
      <p>
        <span>2.</span>Create new course...
      </p>
      <p>
        <span>3.</span>Publish your awsome course.
      </p>
      <p>
        <span>4.</span>Done n Dusted 😎!
      </p>
    </React.Fragment>
  );
};

export default props => {
  const [tab, setTab] = useState("learn");
  return (
    <div className={css.container}>
      <div className={css.grid}>
        <div className={css.primary}>
          <span className={css.title}>How It Works?</span>
          <div className={css.actions}>
            <Nav activeKey={tab} onSelect={e => setTab(e)} justified>
              <Nav.Item eventKey="learn" className={css.ad_nav_tab_title}>
                Learn
              </Nav.Item>
              <Nav.Item eventKey="contribute" className={css.ad_nav_tab_title}>
                Contribute
              </Nav.Item>
            </Nav>

            <div className={css.list}>
              {tab === "learn"
                ? renderLearnInstructions()
                : renderConributeInstructions()}
            </div>

            <div />
          </div>
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
        </div>
      </div>

      <div />
    </div>
  );
};
