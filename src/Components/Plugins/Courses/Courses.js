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
import enrollEventHandler from "../../../Actions/Enroll";

const URLS = {
  LIST_COURSE: "http://127.0.0.1:8000/api/course/"
};

class Courses extends Component {
  state = {
    courses: []
  };

  renderCoursesList = () => {
    // TODO: showcase these according to different categories
    return this.state.courses.map(course => {
      return (
        <Card key={course["id"]} raised href={`/courses/${course["id"]}`}>
          <Segment basic padded>
            <Header size="large">{course.title}</Header>
            <span>{course.description}</span>
          </Segment>
          <Segment basic>
            <Label color="grey" image>
              <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
              {course.author.username}
              <Label.Detail>Author</Label.Detail>
            </Label>
            <Label color="olive">
              <Icon name="dollar" />
              {course.credit_points}
              <Label.Detail>Credit Points</Label.Detail>
            </Label>
          </Segment>
          <Segment basic>
            <Label basic color="teal" size="large">
              {course.subject}
            </Label>
            <Label basic color="violet" size="large">
              {course.category.title}
            </Label>
          </Segment>
          <Button
            color="facebook"
            onClick={() => enrollEventHandler(course["id"])}
            attached="bottom"
            fluid
            size="large">
            Enroll
          </Button>
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
      <Container className={"CoursesPlugin"}>
        <br />
        <Header as={Grid.Column} dividing size="huge">
          Courses List
        </Header>
        <br />
        <Card.Group itemsPerRow={3}>{this.renderCoursesList()}</Card.Group>
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
