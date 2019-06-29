import React, { Component } from "react";
import { Container, Segment, Dimmer, Loader } from "semantic-ui-react";
import { SideSheet, Position } from "evergreen-ui";
import {
  renderPublishedCoursesList as PublishedCoursesList,
  renderEnrolledCoursesList as EnrolledCoursesList
} from "../../Generic/CourseList/courselist";
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
    visible: false
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

  renderLoader = () => {
    return (
      <Container>
        <br />
        <br />
        <br />
        <br />
        <Segment basic>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </Container>
    );
  };

  renderCourses = (courses, listType) => {
    if (courses.length === 0) {
      return <p>Take up some courses</p>;
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
      <span>Courses you'll enroll in</span>
    ) : (
      this.renderCourses(courseEnrolledin, courseListType.ENROLLED)
    );
  };

  render() {
    const courseListing = this.state.courses;

    return (
      <div className={"CoursesPlugin"}>
        <div className={css.courses}>
          <div className={css.overlayBtn}>
            <button onClick={this.handleShowClick}>
              <span>My Courses</span>
            </button>
          </div>

          <SideSheet
            isShown={this.state.visible}
            onCloseComplete={this.handleHideClick}
            preventBodyScrolling
            width={600}>
            <div className={css.myCourses}>
              <div className={css.heading}>
                <span>My Courses</span>
              </div>
              {this.renderMyCourses()}
            </div>
          </SideSheet>

          <div className={css.catalog}>
            <div className={css.heading}>
              <span>Course Catalog</span>
              <div className={css.searchBar}>
                <input
                  placeholder="Course Name"
                  name="courseSearched"
                  type="text"
                  value={this.state.courseSearched}
                  onChange={event => this.changeHandler(event)}
                />
                <button>Search</button>
              </div>
            </div>
            {courseListing === null
              ? this.renderLoader()
              : this.renderCourses(courseListing, courseListType.CATALOG)}
          </div>
        </div>
      </div>
    );
  }

  // Lifecycle methods
  componentDidMount() {
    console.log("[Courses.js] component did mount", this.state);
    getEnrolledCoursesList(this.saveEnrolledCoursesHandler);
    getCoursesList(this.saveCoursesHandler);
  }

  componentWillUnmount() {
    console.log("[courses.js] component will unmount");
  }

  // shouldComponentUpdate() {
  //   console.log("[Courses.js] should component Update");
  //   return true;
  // }

  componentDidUpdate() {
    console.log("[Courses.js] component did update");
  }
}

export default Courses;
