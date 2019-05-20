import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Button,
  Header,
  Segment,
  Dimmer,
  Loader
} from "semantic-ui-react";
import CoursesList from "../../Generic/Assets/CoursesList";
import { courseListType } from "../../../globals";
import {
  getCoursesList,
  getEnrolledCoursesList
} from "../../../Requests/Courses";

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
    return (
      <Card.Group itemsPerRow={3}>
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
      <Container className={"CoursesPlugin"}>
        <br />
        <Header as={Grid.Column} dividing size="huge">
          My Courses
        </Header>
        {this.renderMyCourses()}
        <br />
        <Header as={Grid.Column} dividing size="huge">
          Courses List
        </Header>
        {courseListing === null
          ? this.renderLoader()
          : this.renderCourses(courseListing, courseListType.LIST)}
        <br />
      </Container>
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
