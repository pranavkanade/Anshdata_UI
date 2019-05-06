import React, { Component } from "react";
import { Grid, Segment, Container, Divider } from "semantic-ui-react";
import Router from "next/router";
import CourseForm from "./Course/Form";
import CourseRender from "./Course/Render";
import ModuleForm from "./Module/Form";
import LessonForm from "./Lesson/Form";
import AssignmentForm from "./Assignment/Form";
import Toolbar from "./Toolbar";

class CourseContribution extends Component {
  state = {
    isCourseSaved: false,
    course: {},
    shouldOpenAddModule: false,
    shouldOpenAddLesson: false,
    shouldOpenAddAssignment: false,
    elementBeingAdded: ""
  };

  courseSaveHandler = course => {
    console.log("[Contrib/Course.js] Course has been saved");
    this.setState({
      isCourseSaved: !this.state.isCourseSaved,
      course: course
    });
  };

  renderCourseForm = () => {
    if (!this.state.isCourseSaved) {
      return <CourseForm onSaveHandler={this.courseSaveHandler} />;
    }
    return null;
  };

  closeHandler = () => {
    this.setState({
      shouldOpenAddModule: false,
      shouldOpenAddLesson: false,
      shouldOpenAddAssignment: false,
      elementBeingAdded: ""
    });
  };

  addNewHandler = btn => {
    console.log("[Contrib/Course.js] Add New Clicked : ", btn);
    if (btn === "module") {
      this.setState({ shouldOpenAddModule: true, elementBeingAdded: btn });
    } else if (btn === "lesson") {
      this.setState({ shouldOpenAddLesson: true, elementBeingAdded: btn });
    } else if (btn === "assignment") {
      this.setState({ shouldOpenAddAssignment: true, elementBeingAdded: btn });
    }
  };

  renderAddNewForm = () => {
    const btn = this.state.elementBeingAdded;
    console.log("[Contrib/Course.js] render add new form : ", btn);
    if (btn === "module") {
      return (
        <ModuleForm
          open={true}
          closeHandler={this.closeHandler}
          course={this.state.course}
        />
      );
    } else if (btn === "lesson") {
      return (
        <LessonForm
          open={true}
          closeHandler={this.closeHandler}
          course={this.state.course}
        />
      );
    } else if (btn === "assignment") {
      return (
        <AssignmentForm
          open={true}
          closeHandler={this.closeHandler}
          course={this.state.course}
        />
      );
    }
  };

  renderCourse = () => {
    if (this.state.isCourseSaved) {
      return <CourseRender course={this.state.course} />;
    }
    return null;
  };

  render() {
    return (
      <Container>
        <br />
        <br />
        <Grid>
          <Grid.Row columns={2} divided>
            <Grid.Column width="13">
              <Segment basic>
                {this.renderCourseForm()}
                {this.renderCourse()}
                {this.renderAddNewForm()}
              </Segment>
            </Grid.Column>
            <Grid.Column width="3">
              <Toolbar addHandler={this.addNewHandler} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  componentDidUpdate() {
    // TODO: Here fetch the course here and then everytime fill the renders from here
    // TODO: pull list of modules here so that it can be passed to where ever is needed. Fetch this everytime we create a module
    // TODO: This is to be stored in contrib state by redux
  }
}

export default CourseContribution;
