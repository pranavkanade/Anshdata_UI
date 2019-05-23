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
    enrolledCourses: null
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
      <Card.Group>
        <CoursesList
          courses={courses}
          courseListType={listType}
          detailURL={"/courses"}
        />
      </Card.Group>
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
            <Divider hidden />
            <Divider hidden />
            <text className={css.heading}>My Courses</text>
            <Divider />
            {this.renderMyCourses()}
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </div>

          <div className={css.catalog}>
            <Divider hidden />
            <Divider hidden />
            <text className={css.heading}>Course Catalog</text>
            <Divider />
            {courseListing === null
              ? this.renderLoader()
              : this.renderCourses(courseListing, courseListType.LIST)}
          </div>
          <Divider hidden />
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
