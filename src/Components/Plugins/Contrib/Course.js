import React, { Component } from "react";
import { Grid, Segment, Container, Divider } from "semantic-ui-react";
import CourseForm from "./Course/Form";
import ModuleForm from "./Module/Form";
import LessonForm from "./Lesson/Form";
import AssignmentForm from "./Assignment/Form";
import Toolbar from "./Toolbar";
import DetailedCourse from "../Courses/Detailed";

class CourseContribution extends Component {
  state = {
    courseId: this.props.courseId,
    course: null,
    shouldOpenAddModule: false,
    shouldOpenAddLesson: false,
    shouldOpenAddAssignment: false,
    elementBeingAdded: "",
    newEleId: null
  };

  closeHandler = () => {
    this.setState({
      shouldOpenAddModule: false,
      shouldOpenAddLesson: false,
      shouldOpenAddAssignment: false,
      elementBeingAdded: ""
    });
  };

  onSaveHandler = eleId => {
    console.log("new element ", eleId);
    this.setState({ newEleId: eleId });
  };

  setCourseValue = course => {
    this.setState({ course });
  };

  courseSaveHandler = course => {
    console.log("[Contrib/Course.js] Course has been saved");
    this.setState({
      courseId: course.id
    });
  };

  addNewHandler = (btn, moduleId, lessonId) => {
    console.log(
      "[Contrib/Course.js] Add New Clicked : ",
      btn,
      moduleId,
      lessonId
    );
    // TODO: fetch the module data here and then pass on to the form
    if (btn === "module") {
      this.setState({
        shouldOpenAddModule: true,
        elementBeingAdded: btn,
        moduleId,
        lessonId
      });
    } else if (btn === "lesson") {
      this.setState({
        shouldOpenAddLesson: true,
        elementBeingAdded: btn,
        moduleId,
        lessonId
      });
    } else if (btn === "assignment") {
      this.setState({
        shouldOpenAddAssignment: true,
        elementBeingAdded: btn,
        moduleId,
        lessonId
      });
    }
  };

  renderCourseForm = () => {
    if (this.state.courseId === undefined) {
      return <CourseForm onSaveHandler={this.courseSaveHandler} />;
    }
    return null;
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
          onSaveHandler={this.onSaveHandler}
        />
      );
    } else if (btn === "lesson") {
      return (
        <LessonForm
          open={true}
          closeHandler={this.closeHandler}
          moduleId={this.state.moduleId}
          course={this.state.course}
          onSaveHandler={this.onSaveHandler}
        />
      );
    } else if (btn === "assignment") {
      return (
        <AssignmentForm
          open={true}
          closeHandler={this.closeHandler}
          moduleId={this.state.moduleId}
          lessonId={this.state.lessonId}
          course={this.state.course}
          onSaveHandler={this.onSaveHandler}
        />
      );
    }
  };

  renderDetailedCourse = courseId => {
    // TODO: Add an edit handler too
    return (
      <DetailedCourse
        courseId={courseId}
        viewType={"mod"}
        addHandler={this.addNewHandler}
        setCourse={this.setCourseValue}
        newEleId={this.state.newEleId}
      />
    );
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
                {this.renderAddNewForm()}
                {this.state.courseId !== undefined
                  ? this.renderDetailedCourse(this.state.courseId)
                  : null}
              </Segment>
            </Grid.Column>
            <Grid.Column width="3">
              <Toolbar
                addHandler={this.addNewHandler}
                courseId={this.state.courseId}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    // TODO: Here fetch the course here and then everytime fill the renders from here
    // TODO: pull list of modules here so that it can be passed to where ever is needed. Fetch this everytime we create a module
    console.log("[Contrib/Course.js] state : ", this.state);
    // TODO: This is to be stored in contrib state by redux
  }
}

export default CourseContribution;
