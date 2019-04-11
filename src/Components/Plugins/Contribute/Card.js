import React from "react";
import StyleClasses from "./Card.scss";
import Router from "next/router";

const card = props => {
  return (
    <div className={"card sticky-action " + StyleClasses.ContribBox}>
      <div className="card-image waves-effect waves-block waves-light ">
        <img
          className={"activator " + StyleClasses.Banner}
          src={props.banner}
        />
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          {props.title}
          <i className="material-icons right">close</i>
        </span>
        <p>
          Here is some more information about this product that is only
          revealed once clicked on.
        </p>
      </div>
      <button
        className={
          "card-action btn " +
          StyleClasses.Btn +
          " waves-effect waves-block waves-light"
        }
        onClick={() => {
          Router.push(props.href);
        }}>
        {props.action}
      </button>
    </div>
  );
};

export default card;
