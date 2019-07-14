import React, { Component } from "react";

import css from "./TopCourses.scss";

import { getTopPopularCourses } from "./../../../../Requests/Courses";
import { renderTopCoursesList as CourseList } from "../../../Generic/CourseList/courselist";
export default class extends Component {
  state = {
    courses: null,
    crsCount: 5
  };

  coursesSaveHandler = courses => {
    this.setState({ courses });
  };

  renderCategoryCards = () => {
    console.log("top courses : ", this.state.courses);
    if (this.state.courses === null) {
      return null;
    }
    const courses = this.state.courses.slice(0, this.state.crsCount);
    return (
      <div className={css.categoryCarousel}>
        <CourseList courses={courses} />
      </div>
    );
  };

  displayMore = () => {
    const count = this.state.crsCount + 5;
    // this.setState({ crsCount: count });
    if (count <= this.state.courses.length) {
      this.setState({ crsCount: count });
    } else {
      this.setState({ crsCount: this.state.courses.length });
    }
  };

  displayLess = () => {
    const count = this.state.crsCount - 5;
    // this.setState({ crsCount: count });
    if (count >= 5) {
      this.setState({ crsCount: count });
    } else {
      this.setState({ crsCount: 5 });
    }
  };

  render() {
    return (
      <div className={css.container}>
        <span className={css.title}>Top Courses</span>
        {this.renderCategoryCards()}
        <div className={css.actions}>
          <button className={css.more} onClick={this.displayMore}>
            <img src="/static/assets/icon/add_24px_outlined.svg" />
          </button>
          <button className={css.less} onClick={this.displayLess}>
            <img src="/static/assets/icon/remove_24px_outlined.svg" />
          </button>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    getTopPopularCourses(this.coursesSaveHandler);
  };
}
