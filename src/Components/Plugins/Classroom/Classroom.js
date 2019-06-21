import React, { Component } from "react";
import Router from "next/router";
import { getCourse } from "../../../Requests/Courses";
import { getIfEnrolled } from "../../../Requests/Enrollment";
import ClassroomBase from "./Base";

class CourseClassroom extends Component {
  state = {
    course: this.props.course,
    courseId: this.props.courseId,
    activeModule: null,
    activeLesson: null,
    isEnrolledIn: false
  };

  moduleSelectionHandler = module => {
    console.log("module switched : ", module.id);
    this.setState({ activeModule: module });
  };

  lessonSelectionHandler = (lsnId, modId) => {
    console.log("lesson activated : ", lsnId);
    let activatedMod = null;

    if (modId === this.state.activeModule.id) {
      activatedMod = this.state.activeModule;
    } else {
      activatedMod = {
        ...this.state.course.modules.find(mod => {
          return modId === mod.id;
        })
      };
      this.moduleSelectionHandler(activatedMod);
    }

    const activatedLsn = {
      ...activatedMod.lessons.find(lsn => {
        return lsnId === lsn.id;
      })
    };
    console.log("lesson activated : ", activatedLsn);
    this.setState({ activeLesson: activatedLsn });
  };

  ifEnrolledSaveHandler = data => {
    if (data.length !== 0) {
      this.setState({ isEnrolledIn: true });
    } else {
      Router.push(`/courses/${this.state.courseId}`);
    }
  };

  initialize = course => {
    // TODO: for now setting to the first module and first lesson.
    this.setState({
      activeModule: course.modules[0],
      activeLesson: course.modules[0].lessons[0]
    });
    console.log("module initiated");
  };

  courseSaveHandler = course => {
    console.log("[Attend.js] saving course");
    this.setState({ course });
    this.initialize(course);
  };

  render() {
    return (
      <ClassroomBase
        course={this.state.course}
        activeModule={this.state.activeModule}
        activeLesson={this.state.activeLesson}
        moduleSelectionHandler={this.moduleSelectionHandler}
        lessonSelectionHandler={this.lessonSelectionHandler}
      />
    );
  }

  componentDidMount() {
    // Here assume if the course is undefined then we are directly comming
    // from the tile representaion and not the detailed course.
    // In that case only we should fetch the course else use the earliear data.
    if (this.state.course === undefined || this.state.course === null) {
      getCourse(this.state.courseId, this.courseSaveHandler);
    }

    getIfEnrolled(this.state.courseId, this.ifEnrolledSaveHandler);
  }

  componentDidUpdate() {}
}

export default CourseClassroom;

// TODO: Show course level assignments
