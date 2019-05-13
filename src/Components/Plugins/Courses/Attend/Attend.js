import React, { Component } from "react";
import { getCourse } from "../requests";
import Course from "./Render";
import { Container, Divider, Grid, Accordion, Menu } from "semantic-ui-react";

class AttendCourse extends Component {
  state = {
    course: this.props.course,
    courseId: this.props.courseId,
    activeModId: null,
    activeLesson: null,
    activeAssign: null
  };

  activeLessonHandler = lsn => {
    console.log("active lesson : ", lsn);
    this.setState({ activeLesson: lsn, activeAssign: null });
  };

  activeAssignmentHandler = assign => {
    console.log("active assignment : ", assign);
    this.setState({ activeLesson: null, activeAssign: assign });
  };

  moduleExpansionHandler = modId => {
    if (modId === this.state.activeModId) {
      // NOTE: In case when use clicks on expanded module
      // we need to close it
      console.log("Closing module: ", modId);
      this.setState({ activeModId: -1 });
    } else {
      console.log("Module to expand: ", modId);
      this.setState({ activeModId: modId });
    }
  };

  setDefaultLesson = () => {
    console.log("[Attend.js] setting default lesson");
    const lesson = this.state.course.modules[0].lessons[0];
    this.setState({ activeLesson: lesson });
  };

  courseSaveHandler = course => {
    console.log("[Attend.js] saving course");
    this.setState({ course });
    this.setDefaultLesson();
  };

  render() {
    return (
      <Course
        course={this.state.course}
        activeModId={this.state.activeModId}
        activeLesson={this.state.activeLesson}
        activeAssign={this.state.activeAssign}
        modExpandHandler={this.moduleExpansionHandler}
        activeLessonHandler={this.activeLessonHandler}
        activeAssignmentHandler={this.activeAssignmentHandler}
      />
    );
  }

  componentDidMount() {
    // Here assume if the course is undefined then we are directly comming
    // from the tile representaion and not the detailed course.
    // In that case only we should fetch the course else use the earliear data.
    if (this.state.course === undefined) {
      getCourse(this.state.courseId, this.courseSaveHandler);
    }
  }
}

export default AttendCourse;

// TODO: Show course level assignments
