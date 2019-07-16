import React, { Component } from "react";
import { connect } from "react-redux";
import { getTopCourses } from "../../../../store/actions";
import css from "./TopCourses.scss";

import { renderTopCoursesList as CourseList } from "../../../Generic/CourseList/courselist";
class TopCourses extends Component {
  state = {
    courses: this.props.topCourses,
    crsCount: 5
  };

  coursesSaveHandler = courses => {
    this.setState({ courses });
  };

  renderCategoryCards = () => {
    const { topCourses } = this.props;
    console.log("top courses : ", topCourses);
    if (topCourses === null || topCourses === undefined) {
      return null;
    }
    const courses = topCourses.slice(0, this.state.crsCount);
    return (
      <div className={css.categoryCarousel}>
        <CourseList courses={courses} />
      </div>
    );
  };

  displayMore = () => {
    const { topCourses } = this.props;
    const count = this.state.crsCount + 5;
    // this.setState({ crsCount: count });
    if (count <= topCourses.length) {
      this.setState({ crsCount: count });
    } else {
      this.setState({ crsCount: topCourses.length });
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
    if (
      this.props.topCourses === null ||
      this.props.topCourses === undefined
    ) {
      this.props.getTopCourses();
    }
  };
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  const { topCourses } = state.crs;
  return { isAuthenticated, topCourses };
}

const mapDispatchToProps = { getTopCourses };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopCourses);
