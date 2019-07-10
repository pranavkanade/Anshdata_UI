import React from "react";
import App from "../src/Containers/App";
import css from "../static/styles/not_found.scss";

const PageNotFound = props => {
  return (
    <App page={"Platform"}>
      <div className={css.not_found}>
        <img src="../static/assets/imgs/404_img.svg" />
        <div>
          <span>We appreciate your curiosity!</span>
          <p>
            Sorry! But, we don't have anything to offer on this page.
            <br />
            :(
          </p>
        </div>
      </div>
    </App>
  );
};

export default PageNotFound;
