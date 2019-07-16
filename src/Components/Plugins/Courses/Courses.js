import React, { Component } from "react";
import { Drawer } from "rsuite";
import { connect } from "react-redux";
import {
  renderPublishedCoursesList as PublishedCoursesList,
  renderEnrolledCoursesList as EnrolledCoursesList
} from "../../Generic/CourseList/courselist";
import Loader from "../../Generic/Loader/loader";
import { courseListType } from "../../../globals";
import {
  getCoursesList,
  getEnrolledCoursesList
} from "../../../Requests/Courses";

import css from "./courses.scss";

class Courses extends Component {
  state = {
    courses: null,
    enrolledCourses: null,
    courseSearched: "",
    selectedCourse: 0,
    visible: false,
    isAuthenticated: this.props.isAuthenticated
  };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  setSelectedCourse = courseId => {
    if (this.state.selectedCourse === courseId) {
      this.setState({ selectedCourse: 0 });
    } else {
      this.setState({ selectedCourse: courseId });
    }
  };

  closeSelectedCourse = () => {
    this.setState({ selectedCourse: 0 });
  };

  saveCoursesHandler = courses => {
    this.setState({ courses });
  };

  saveEnrolledCoursesHandler = enrolledCourses => {
    if (enrolledCourses.detail === undefined) {
      this.setState({ enrolledCourses });
    }
  };

  renderCourses = (courses, listType) => {
    if (courses.length === 0) {
      return <p>Course List</p>;
    }

    if (listType === courseListType.ENROLLED) {
      return (
        <EnrolledCoursesList
          courses={courses}
          courseListType={listType}
          setSelectedCourse={this.setSelectedCourse}
          selectedCourse={this.state.selectedCourse}
          closeSelectedCourse={this.closeSelectedCourse}
        />
      );
    } else {
      return (
        <PublishedCoursesList
          courses={courses}
          courseListType={listType}
          setSelectedCourse={this.setSelectedCourse}
          selectedCourse={this.state.selectedCourse}
          closeSelectedCourse={this.closeSelectedCourse}
        />
      );
    }
  };

  renderMyCourses = () => {
    const courseEnrolledin = this.state.enrolledCourses;
    console.log("Courses enrolled : ", courseEnrolledin);
    // return null;
    return courseEnrolledin === null ? (
      <span>Your Courses</span>
    ) : (
      this.renderCourses(courseEnrolledin, courseListType.ENROLLED)
    );
  };

  render() {
    const courseListing = this.state.courses;

    return (
      <div className={"CoursesPlugin"}>
        <div className={css.ad_courses}>
          <Drawer
            show={this.state.visible}
            onHide={this.handleHideClick}
            size="sm">
            <Drawer.Header className={css.ad_drawer_title}>
              <span>My Courses</span>
            </Drawer.Header>
            <div className={css.ad_myCourses}>
              <div>{this.renderMyCourses()}</div>
            </div>
          </Drawer>
          <div className={css.ad_overlayBtn}>
            <button onClick={this.handleShowClick}>
              <span>My Courses</span>
            </button>
          </div>
          <div className={css.ad_catalog}>
            <div className={css.ad_heading}>
              <span>Course Catalog</span>
              {/*<div className={css.ad_searchBar}>
                <input
                  placeholder="Course Name"
                  name="courseSearched"
                  type="text"
                  value={this.state.courseSearched}
                  onChange={event => this.changeHandler(event)}
                />
                <button>Search</button>
              </div>*/}
            </div>
            {courseListing === null ? (
              <Loader msg="Gathering all courses" />
            ) : (
              this.renderCourses(courseListing, courseListType.CATALOG)
            )}
          </div>
        </div>
      </div>
    );
  }

  // Lifecycle methods
  componentDidMount() {
    console.log("[Courses.js] component did mount", this.state);
    if (this.state.isAuthenticated) {
      getEnrolledCoursesList(this.saveEnrolledCoursesHandler);
    }
    getCoursesList(this.saveCoursesHandler);
  }

  componentWillUnmount() {
    console.log("[courses.js] component will unmount");
  }

  componentDidUpdate() {
    console.log("[Courses.js] component did update");
    if (this.props.isAuthenticated && this.state.enrolledCourses === null) {
      // NOTE: This is going to be hell merry .. when actually new user comes on this page.
      getEnrolledCoursesList(this.saveEnrolledCoursesHandler);
      getCoursesList(this.saveCoursesHandler);
    }
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
}

export default connect(mapStateToProps)(Courses);
