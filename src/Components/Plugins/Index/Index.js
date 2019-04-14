import React from "react";

import StyleClasses from "./Index.scss";

const indexPlugin = props => {
  return (
    <div className={StyleClasses.index}>
      <div className={StyleClasses.banner + " " + StyleClasses.hero}>
        <h3>Heading from Index Plugin's Hero</h3>
      </div>
      <div className={StyleClasses.banner + " " + StyleClasses.second}>
        <h3>Heading from Second</h3>
      </div>
      <div className={StyleClasses.banner + " " + StyleClasses.third}>
        <h3>Heading from Third</h3>
      </div>
      <div className={StyleClasses.banner + " " + StyleClasses.fourth}>
        <h3>Heading from Fourth</h3>
      </div>
    </div>
  );
};

export default indexPlugin;
