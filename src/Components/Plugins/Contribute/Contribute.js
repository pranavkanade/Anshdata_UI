import React, { Component } from "react";
import StyleClasses from "./Contribute.scss";
import Card from "./Card";

class Contribute extends Component {
  renderContributionStats = () => {
    return (
      <div className="row">
        <div className="col s2" />
        <div className="col s3">
          <div className={StyleClasses.StatBox}>
            <text className={StyleClasses.Stat}>132</text>
            <br />
            <text className={StyleClasses.Label}>Courses</text>
          </div>
        </div>
        <div className="col s2">
          <div className={StyleClasses.StatBox}>
            <text className={StyleClasses.Stat}>649</text>
            <br />
            <text className={StyleClasses.Label}>Assignments</text>
          </div>
        </div>
        <div className="col s3">
          <div className={StyleClasses.StatBox}>
            <text className={StyleClasses.Stat}>3095</text>
            <br />
            <text className={StyleClasses.Label}>Reviews</text>
          </div>
        </div>
        <div className="col s2" />
      </div>
    );
  };

  renderContributionMenu = () => {
    return (
      <div className={StyleClasses.ContribPanel}>
        <div className={"row"}>
          <div className="col s2" />
          <div className="col s8">
            <div className={"row"}>
              <div className={"col s4"}>
                <Card
                  banner="/static/images/contrib/course.png"
                  title="Create New Courses"
                  action="Add New Course"
                  href="/contrib/course"
                />
              </div>
              <div className={"col s4 "}>
                <Card
                  banner="/static/images/contrib/assign.png"
                  title="Create New Assignment"
                  action="Add New Assignment"
                  href="/contrib/assign"
                />
              </div>
              <div className={"col s4 left"}>
                <Card
                  banner="/static/images/contrib/review.png"
                  title="Review Solutions"
                  action="Review Solutions"
                  href="/contrib/review"
                />
              </div>
            </div>
          </div>
          <div className="col s2" />
        </div>
      </div>
    );
  };

  renderTestimonials = () => {
    return (
      <div className={StyleClasses.Second}>
        <div className={StyleClasses.TestimonialsBlock} />
      </div>
    );
  };

  renderTest = () => {
    return (
      <div className="row">
        <div className={"col s4 " + StyleClasses.ContribPanel}>
          <div className={StyleClasses.TestDiv} />
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <div className={StyleClasses.Contribute}>
        <div className={StyleClasses.Hero}>
          {this.renderContributionStats()}
          {this.renderContributionMenu()}
          {this.renderTestimonials()}
        </div>
      </div>
    );
  };
}

export default Contribute;
