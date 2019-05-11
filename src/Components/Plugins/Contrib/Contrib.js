import React, { Component } from "react";
import Link from "next/link";
import {
  Container,
  Grid,
  Button,
  Card,
  Label,
  Header,
  Divider
} from "semantic-ui-react";
import CoursesList from "../../Generic/Assets/CoursesList";
import { courseListType } from "../../../globals";
import { getAuthorization } from "../../../Requests/Authorization";

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
      await fetch(URLS.LIST_DRAFTED_COURSES, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: getAuthorization()
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

  // TODO: Add a tab of all the courses that are pending for the review
  // A tab for courses that are ready to publish
  render() {
    console.log("[Contrib.js] render");
    return (
      <Container as="div" className={"ContributePlugin"}>
        <Divider hidden />
        <Divider hidden />
        <Link href="/contrib/course">
          <Button inverted color="twitter" size="big" floated="right">
            Add New Course
          </Button>
        </Link>
        <Divider hidden />
        <Header dividing size="large">
          List of drafted courses
        </Header>
        <br />
        <Card.Group itemsPerRow={3}>
          <CoursesList
            courses={this.state.courses}
            courseListType={courseListType.MODIFY}
            detailURL={"/contrib/course"}
          />
        </Card.Group>
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
