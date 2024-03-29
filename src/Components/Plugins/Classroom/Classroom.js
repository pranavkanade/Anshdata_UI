import React, { Component } from "react";
import Router from "next/router";
import Loader from "../../Generic/Loader/loader";
import Error from "../../Generic/Error/error";
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
    isEnrolledIn: null,
    courseProgress: null
  };

  moduleSelectionHandler = module => {
    this.setState({ activeModule: module });
  };

  lessonSelectionHandler = (lsnId, modId) => {
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
    this.setState({ activeLesson: activatedLsn });
  };

  recoverCurrentModNLsn = currentLesson => {
    if (currentLesson === null || currentLesson === undefined) {
      this.initialize(this.state.course);
      return;
    }
    if (this.state.course !== null && this.state.course !== undefined) {
      const activeModule = {
        ...this.state.course.modules.find(mod => {
          return currentLesson.module === mod.id;
        })
      };
      this.setState({
        activeModule,
        activeLesson: currentLesson
      });
    } else {
      this.setState({
        activeLesson: currentLesson
      });
    }
  };

  ifEnrolledSaveHandler = data => {
    if (data !== undefined && data !== null && data.length !== 0) {
      this.setState({
        isEnrolledIn: true,
        courseProgress: data[0]
      });
      this.recoverCurrentModNLsn(data[0].current_lesson);
    } else {
      this.setState({
        isEnrolledIn: false,
        courseProgress: data[0]
      });
    }
  };

  // type : {LESSON, ASSIGNMENT}
  setCourseProgress = (type, componentId) => {
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
    if (this.state.activeLesson === null) {
      this.setState({
        activeModule: course.modules[0],
        activeLesson: course.modules[0].lessons[0]
      });
    } else {
      const activeModule = {
        ...course.modules.find(mod => {
          return this.state.activeLesson.module === mod.id;
        })
      };
      this.setState({
        activeModule
      });
    }
  };

  courseSaveHandler = course => {
    this.setState({ course });
    this.initialize(course);
  };

  render() {
    if (this.state.isEnrolledIn === null) {
      return <Loader msg="Loading ..." />;
    } else if (!this.state.isEnrolledIn) {
      return <Error />;
    }
    return (
      <ClassroomBase
        course={this.state.course}
        activeModule={this.state.activeModule}
        activeLesson={this.state.activeLesson}
        lessonSelectionHandler={this.lessonSelectionHandler}
        setCourseProgress={this.setCourseProgress}
        setCompleted={this.setCompleted}
        courseProgress={this.state.courseProgress}
      />
    );
  }

  componentDidMount = async () => {
    // Here assume if the course is undefined then we are directly comming
    // from the tile representaion and not the detailed course.
    // In that case only we should fetch the course else use the earliear data.
    getIfEnrolled(this.state.courseId, this.ifEnrolledSaveHandler);
  };

  componentDidUpdate = async () => {
    if (
      (this.state.course === undefined || this.state.course === null) &&
      this.state.isEnrolledIn
    ) {
      await getCourse(this.state.courseId, this.courseSaveHandler);
    }
  };
}

export default CourseClassroom;

// TODO: Show course level assignments
