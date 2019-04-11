import React, { Component } from "react";
import StyleClasses from "./Index.scss";
import Router from "next/router";

class Index extends Component {
  onClickExploreCoursesHandler = () => {
    Router.push("/courses");
  };

  onClickContributeNowHandler = () => {
    Router.push("/contrib");
  };

  renderHero = () => {
    return (
      <div className={StyleClasses.Hero}>
        <h3>Heading from Index Plugin</h3>
        <button
          className={"btn waves-effect waves-light " + StyleClasses.btnHero}
          onClick={this.onClickExploreCoursesHandler}>
          Explore Courses
          <i className="large material-icons right">arrow_forward</i>
        </button>
        <small className={StyleClasses.orHero}>Or</small>
        <button
          className={
            "btn waves-effect waves-light " + StyleClasses.btnHeroContrib
          }
          onClick={this.onClickContributeNowHandler}>
          Contribute Now
        </button>
      </div>
    );
  };

  render() {
    return <>{this.renderHero()}</>;
  }
}

export default Index;
