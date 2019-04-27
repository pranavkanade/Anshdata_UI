import React, { Component } from "react";
import Link from "next/link";
import { Container, Grid, Button, Card, Label } from "semantic-ui-react";
import Router from "next/router";

const URLS = {
  LIST_DRAFTED_COURSES: "http://127.0.0.1:8000/api/course/drafts/"
};

class Contrib extends Component {
  state = {
    courses: []
  };

  getDraftedCoursesList = async () => {
    // Only if the user is logged in
    console.log("[Contrib.js] get Courses user has not yet published");
    try {
      const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
        "token"
      ];
      await fetch(URLS.LIST_DRAFTED_COURSES, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `JWT ${AnshdataToken}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.setState({ courses: data });
        });
    } catch (err) {
      console.log(
        "[Contrib.js] Failed to collect the list of drafted courses : ",
        err
      );
    }
  };

  renderCoursesList = () => {
    // TODO: Add more coure details
    try {
      return this.state.courses.map(course => {
        return (
          <Card key={course["id"]} fluid>
            <Card.Content
              header={course["title"]}
              meta={"Author : " + course.author["username"]}
            />
            <Card.Description>{course["description"]}</Card.Description>
            <Card.Content extra>
              <Label color="orange" ribbon>
                {course.category["title"]}
              </Label>
              <Button
                floated="right"
                color="red"
                onClick={() => {
                  console.log("[Contirb.js] Delete button clicked");
                }}>
                Delete
              </Button>
              <Button
                floated="right"
                color="blue"
                onClick={() => {
                  console.log("[Contirb.js] Modify button clicked");
                }}>
                Modify
              </Button>
              <Button
                floated="right"
                color="olive"
                onClick={() => {
                  console.log("[Contirb.js] Publish button clicked");
                }}>
                Publish
              </Button>
            </Card.Content>
          </Card>
        );
      });
    } catch (err) {
      console.log(
        "[Contrib.js] courses are set to null : ",
        this.state.courses
      );
    }
  };

  // TODO: Add a tab of all the courses that are pending for the review
  // A tab for courses that are ready to publish
  render() {
    console.log("[Contrib.js] render");
    return (
      <Container as="div" className={"ContributePlugin"}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width="3" />
            <Grid.Column textAlign="right" width="10">
              <br />
              <Link href="/contrib/course">
                <Button color="twitter">Add New Course</Button>
              </Link>
            </Grid.Column>
            <Grid.Column width="3" />
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column width="3" />
            <Grid.Column width="10">
              <h2>List of drafted courses</h2>
              <hr />
              <br />
              {this.renderCoursesList()}
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    console.log("[Contrib.js] component did mount");
    console.log("State: ", this.state);
    this.getDraftedCoursesList();
  }

  componentWillUnmount() {
    console.log("[Contrib.js] component will unmount");
  }

  shouldComponentUpdate() {
    console.log("[Contrib.js] should component Update");
    return true;
  }

  componentDidUpdate() {
    console.log("[Contrib.js] component did update");
    console.log("State: ", this.state);
  }
}

export default Contrib;
