import React from "react";
import Router from "next/router";
import css from "./error.scss";

const PageNotFound = () => {
  return (
    <>
      <div className={css.action_btns}>
        <button onClick={() => Router.back()}>
          <img src="/static/assets/icon/keyboard_backspace_24px_outlined.svg" />
          <span>Go to Previous Page</span>
        </button>
      </div>
      <div className={css.not_found}>
        <img
          src="/static/assets/imgs/404_not_found.svg"
          alt="Page Not Found"
        />
        <div>
          <span>We appreciate your curiosity!</span>
          <p>
            Sorry! But, we don't have anything to offer on this page.
            <br />
            :(
          </p>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
