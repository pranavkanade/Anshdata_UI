import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Button,
  Header,
  Segment,
  Dimmer,
  Loader,
  Divider
} from "semantic-ui-react";
import CoursesList from "../../Generic/Assets/CoursesList";
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
    selectedCourse: null
  };

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
    this.setState({ selectedCourse: courseId });
  };

  closeSelectedCourse = () => {
    this.setState({ selectedCourse: null });
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
    return (
      <div className={css.listWrapper}>
        <CoursesList
          courses={courses}
          courseListType={listType}
          setSelectedCourse={this.setSelectedCourse}
          selectedCourse={this.state.selectedCourse}
          closeSelectedCourse={this.closeSelectedCourse}
        />
      </div>
    );
  };

  renderMyCourses = () => {
    const courseEnrolledin = this.state.enrolledCourses;
    console.log("Courses enrolled : ", courseEnrolledin);
    // return null;
    return courseEnrolledin === null ? (
      <span>Courses you'll enroll in</span>
    ) : (
      this.renderCourses(courseEnrolledin, courseListType.OVERVIEW)
    );
  };

  render() {
    const courseListing = this.state.courses;

    return (
      <div className={"CoursesPlugin"}>
        <div className={css.courses}>
          <div className={css.myCourses}>
            <div className={css.heading}>
              <span>My Courses</span>
            </div>
            {this.renderMyCourses()}
          </div>

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
              : this.renderCourses(courseListing, courseListType.LIST)}
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
