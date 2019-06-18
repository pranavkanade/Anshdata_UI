import React, { Component } from "react";

import css from "./TopCourses.scss";

import { PublishedCard } from "./../../../Generic/Cards/CourseCard";
export default class extends Component {
  state = {
    activeCC: 0
  };

  categoryCardClasses = [
    css.cat1,
    css.cat2,
    css.cat3,
    css.cat4,
    css.cat5,
    css.cat6
  ];

  renderCategoryCards = () => {
    let { activeCC } = this.state;
    return (
      <div className={css.categoryCarousel}>
        <div className={css.primary}>
          <div className={this.categoryCardClasses[activeCC]}>
            <div className={css.options}>
              <button>category</button>
              <img
                src="./../../../../../static/assets/icon/more_horiz_24px_outlined.svg"
                floated="right"
              />
            </div>
            <div className={css.courseCards}>
              <PublishedCard />
              <PublishedCard />
            </div>
          </div>
          <div className={this.categoryCardClasses[activeCC + 1]}>
            <div className={css.options}>
              <button>category</button>
              <img
                src="./../../../../../static/assets/icon/more_horiz_24px_outlined.svg"
                floated="right"
              />
            </div>
            <div className={css.courseCards}>
              <PublishedCard />
              <PublishedCard />
            </div>
          </div>
        </div>
        <div className={css.secondary} />
      </div>
    );
  };

  render() {
    return (
      <div className={css.container}>
        <span>Top Courses</span>
        {this.renderCategoryCards()}
      </div>
    );
  }
}
