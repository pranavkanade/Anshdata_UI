import React, { Component } from "react";
import Router from "next/router";
import { getCourse } from "../../../Requests/Courses";
import { getIfEnrolled } from "../../../Requests/Enrollment";
import {
  setProgress,
  markAssignmentDone,
  markLessonDone
} from "../../../Requests/courseProgress";
import ClassroomBase from "./Base";

class CourseClassroom extends Component {
  state = {
    course: this.props.course,
    courseId: this.props.courseId,
    activeModule: null,
    activeLesson: null,
    isEnrolledIn: false,
    courseProgress: null
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

  // recoverCurrentModNLsn = currentLesson => {
  //   if (this.state.course !== null && this.state.course !== undefined) {
  //     const activeModule = {
  //       ...this.state.course.modules.find(mod => {
  //         return currentLesson.module === mod.id;
  //       })
  //     };
  //     this.setState({
  //       activeModule,
  //       activeLesson: currentLesson
  //     });
  //   } else {
  //     this.setState({
  //       activeLesson: currentLesson
  //     });
  //   }
  // };

  ifEnrolledSaveHandler = data => {
    if (data.length !== 0) {
      console.log("Course Progress : ", data);
      this.setState({
        isEnrolledIn: true,
        courseProgress: data[0]
      });
      // this.recoverCurrentModNLsn(data[0].current_lesson);
    } else {
      Router.push(`/courses/${this.state.courseId}`);
    }
  };

  // type : {LESSON, ASSIGNMENT}
  setCourseProgress = (type, componentId) => {
    console.log("Set course progress : ", componentId, type);
    if (type === "LESSON") {
      setProgress(this.state.courseProgress.id, {
        current_lesson: componentId
      });
    } else {
      setProgress(this.state.courseProgress.id, {
        current_assignment: componentId
      });
    }
  };

  setCompleted = (type, componentId) => {
    // mark done
    console.log("Set component completed : ", componentId, type);
    if (type === "LESSON") {
      markLessonDone({
        enrollment: this.state.courseProgress.id,
        lesson: componentId
      });
    } else {
      markAssignmentDone({
        enrollment: this.state.courseProgress.id,
        assignment: componentId
      });
    }
  };

  initialize = course => {
    // TODO: un comment following
    // if (this.state.activeLesson === null) {
    this.setState({
      activeModule: course.modules[0],
      activeLesson: course.modules[0].lessons[0]
    });
    // } else {
    //   const activeModule = {
    //     ...course.modules.find(mod => {
    //       return this.state.activeLesson.module === mod.id;
    //     })
    //   };
    //   this.setState({
    //     activeModule
    //   });
    // }

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
        setCourseProgress={this.setCourseProgress}
        setCompleted={this.setCompleted}
        courseProgress={this.state.courseProgress}
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
