import React, { Component } from "react";
import { Container, Grid, Card } from "semantic-ui-react";

const URLS = {
  LIST_COURSE: "http://127.0.0.1:8000/api/course/"
};

class Courses extends Component {
  state = {
    courses: []
  };

  renderCoursesList = courses => {
    return this.state.courses.map((course, idx) => {
      return (
        <Card key={idx}>
          <Card.Content
            header={course["title"]}
            meta={"Author : " + course.author.username}
          />
          <Card.Description>
            {"Enrollment Count : " + course.num_of_enrollments}
          </Card.Description>
        </Card>
      );
    });
  };

  getCourseList = async () => {
    console.log("[Courses.js] get courses");
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];
    await fetch(URLS.LIST_COURSE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${AnshdataToken}`
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ courses: data }));
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
    console.log("[Coures.js] component did mount", this.state);
    this.getCourseList();
  }

  componentWillUnmount() {
    console.log("[App.js] component will unmount");
  }

  shouldComponentUpdate() {
    console.log("[App.js] should component Update");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] component did update");
  }
}

export default Courses;
