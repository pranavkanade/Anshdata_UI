import React, { Component } from "react";
import { Container, Grid, Card, Button } from "semantic-ui-react";
import enrollEventHandler from "../../../Actions/Enroll";

const URLS = {
  LIST_COURSE: "http://127.0.0.1:8000/api/course/"
};

class Courses extends Component {
  state = {
    courses: []
  };

  renderCoursesList = () => {
    return this.state.courses.map(course => {
      return (
        <Card key={course["id"]} fluid href="#">
          <Card.Content
            header={course["title"]}
            meta={"Author : " + course.author.username}
          />
          <Card.Description>
            {"Enrollment Count : " + course.num_of_enrollments}
          </Card.Description>
          <Card.Content extra>
            <Button
              floated="right"
              color="blue"
              onClick={() => enrollEventHandler(course["id"])}>
              Enroll
            </Button>
          </Card.Content>
        </Card>
      );
    });
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
      <Container as="div" className={"CoursesPlugin"}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width="4" />
            <Grid.Column width="8">
              <h4>Courses List</h4>
              {this.renderCoursesList()}
            </Grid.Column>
            <Grid.Column width="4" />
          </Grid.Row>
        </Grid>
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
