import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Button,
  Header,
  Segment,
  Label,
  Icon
} from "semantic-ui-react";
import CoursesList from "../../Generic/Assets/CoursesList";
import { courseListType } from "../../../globals";

const URLS = {
  LIST_COURSE: "http://127.0.0.1:8000/api/course/"
};

class Courses extends Component {
  state = {
    courses: []
  };

  getCourseList = async () => {
    console.log("[Courses.js] get courses");
    try {
      await fetch(URLS.LIST_COURSE, {
        method: "GET"
      })
        .then(response => response.json())
        .then(data => this.setState({ courses: data }));
    } catch (err) {
      // This means we are dealing with anonymous user
      console.log(err);
    }
  };

  render() {
    return (
      <Container className={"CoursesPlugin"}>
        <br />
        <Header as={Grid.Column} dividing size="huge">
          Courses List
        </Header>
        <br />
        <Card.Group itemsPerRow={3}>
          <CoursesList
            courses={this.state.courses}
            courseListType={courseListType.OVERVIEW}
          />
        </Card.Group>
      </Container>
    );
  }

  // Lifecycle methods
  componentDidMount() {
    console.log("[Courses.js] component did mount", this.state);
    this.getCourseList();
  }

  componentWillUnmount() {
    console.log("[courses.js] component will unmount");
  }

  shouldComponentUpdate() {
    console.log("[Courses.js] should component Update");
    return true;
  }

  componentDidUpdate() {
    console.log("[Courses.js] component did update");
  }
}

export default Courses;
