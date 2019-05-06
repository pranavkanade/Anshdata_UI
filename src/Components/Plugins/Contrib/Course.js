import React, { Component } from "react";
import { Grid, Segment, Container, Divider } from "semantic-ui-react";
import Router from "next/router";
import CourseForm from "./Course/Form";
import CourseRender from "./Course/Render";
import ModuleForm from "./Module/Form";
import ModuleRender from "./Module/Render";
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
    elementBeingAdded: "",
    modules: [],
    newModule: {}
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

  addNewHandler = (btn, moduleId = 0) => {
    console.log("[Contrib/Course.js] Add New Clicked : ", btn);
    // TODO: fetch the module data here and then pass on to the form
    if (btn === "module") {
      this.setState({ shouldOpenAddModule: true, elementBeingAdded: btn });
    } else if (btn === "lesson") {
      this.setState({ shouldOpenAddLesson: true, elementBeingAdded: btn });
    } else if (btn === "assignment") {
      this.setState({ shouldOpenAddAssignment: true, elementBeingAdded: btn });
    }
  };

  newModuleSaveHandler = module => {
    console.log("[Contrib/Course.js] New module has been saved");
    this.setState({
      newModule: module
    });

    if (this.state.course.id) {
      this.getModule(this.state.course.id);
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
          onSaveHandler={this.newModuleSaveHandler}
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

  renderModule = mod => {
    return (
      <ModuleRender
        module={mod}
        key={mod.id}
        addHandler={this.addNewHandler}
      />
    );
  };

  renderModules = () => {
    if (this.state.modules.length === 0) {
      return null;
    }
    const modules = this.state.modules;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width="2" />
          <Grid.Column width="13">
            {modules.map(mod => {
              return this.renderModule(mod);
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
                {this.renderCourse()}
                {this.renderModules()}
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

  getModule = async crsId => {
    const GET_COURSE_MODULES = `http://127.0.0.1:8000/api/course/${crsId}/min/mod/`;

    console.log("[Contrib/Action.js] get newly created modules: ", crsId);
    try {
      await fetch(GET_COURSE_MODULES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(`Modules of the course with id ${crsId} `, data);
          this.setState({
            modules: data
          });
        });
    } catch (err) {
      console.log(
        "[Contrib/Action.js] Error when getting list of modules : ",
        err
      );
    }
  };

  componentDidUpdate() {
    // TODO: Here fetch the course here and then everytime fill the renders from here
    // TODO: pull list of modules here so that it can be passed to where ever is needed. Fetch this everytime we create a module
    console.log("[Contrib/Course.js] state : ", this.state);
    // TODO: This is to be stored in contrib state by redux
  }
}

export default CourseContribution;
