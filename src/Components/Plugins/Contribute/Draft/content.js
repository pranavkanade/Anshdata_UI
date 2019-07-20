import React, { Component } from "react";
import css from "./content.scss";

import {
  ModuleCardDraft,
  DetailedModuleCardDraft
} from "../../../Generic/Cards/ModuleCard";

import { draftAssignmentCard as AssignmentCard } from "../../../Generic/Cards/AssignmentCard";

import ModuleForm from "../../../Generic/Forms/module";
import LessonForm from "../../../Generic/Forms/lesson";
import AssignmentForm from "../../../Generic/Forms/assignment";

class CourseContent extends Component {
  state = {
    course: this.props.course,
    activeModule: 0,
    activeLesson: 0,
    activeAssignment: 0,
    shouldOpenAddModule: false,
    shouldOpenAddLesson: false,
    shouldOpenAddAssignment: false,
    elementBeingAdded: ""
  };

  closeSelectedModule = () => {
    this.setState({ activeModule: 0 });
  };

  setSelectedModule = id => {
    this.setState({ activeModule: id });
  };

  modifySelectedModule = id => {
    this.addHandler("module", id);
  };

  closeHandler = () => {
    this.setState({
      shouldOpenAddModule: false,
      shouldOpenAddLesson: false,
      shouldOpenAddAssignment: false,
      elementBeingAdded: "",
      activeModule: 0,
      activeLesson: 0,
      activeAssignment: 0
    });
  };

  addHandler = (
    btn,
    moduleId = null,
    lessonId = null,
    assignmentId = null
  ) => {
    if (btn === "assignment") {
      this.setState({
        shouldOpenAddAssignment: true,
        elementBeingAdded: btn,
        activeModule: moduleId !== null ? moduleId : 0,
        activeLesson: lessonId !== null ? lessonId : 0,
        activeAssignment: assignmentId !== null ? assignmentId : 0
      });
    } else if (btn === "lesson") {
      this.setState({
        shouldOpenAddLesson: true,
        elementBeingAdded: btn,
        activeModule: moduleId !== null ? moduleId : 0,
        activeLesson: lessonId !== null ? lessonId : 0
      });
    } else if (btn === "module") {
      this.setState({
        shouldOpenAddModule: true,
        elementBeingAdded: btn,
        activeModule: moduleId !== null ? moduleId : 0
      });
    }
  };

  renderAddNewForm = () => {
    const btn = this.state.elementBeingAdded;
    if (this.state.shouldOpenAddModule) {
      return (
        <ModuleForm
          open={true}
          course={this.state.course}
          closeHandler={this.closeHandler}
          edit={true}
          moduleId={this.state.activeModule}
        />
      );
    } else if (this.state.shouldOpenAddLesson) {
      return (
        <LessonForm
          open={true}
          closeHandler={this.closeHandler}
          moduleId={this.state.activeModule}
          lessonId={this.state.activeLesson}
          course={this.state.course}
        />
      );
    } else if (this.state.shouldOpenAddAssignment) {
      return (
        <AssignmentForm
          open={true}
          closeHandler={this.closeHandler}
          moduleId={this.state.activeModule}
          lessonId={this.state.activeLesson}
          assignmentId={this.state.activeAssignment}
          course={this.state.course}
        />
      );
    }
    return null;
  };

  renderModulesList = () => {
    const AddModuleBtn = (
      <div className={css.moduleBtn} onClick={() => this.addHandler("module")}>
        <img src="../../../../../static/assets/icon/add_circle_outline_24px_outlined.svg" />
        <span>Add New Module</span>
      </div>
    );
    const Modules = this.state.course.modules.map(mod => {
      return (
        <React.Fragment key={`fragment_mod_${mod.id}`}>
          <ModuleCardDraft
            module={mod}
            key={`module_draft_${mod.id}`}
            select={this.setSelectedModule}
            modify={this.modifySelectedModule}
          />
          {this.state.activeModule === mod.id &&
          !this.state.shouldOpenAddModule ? (
            <DetailedModuleCardDraft
              module={mod}
              key={`mod_detailed_${mod.id}`}
              close={this.closeSelectedModule}
              addNewBtn={this.addHandler}
            />
          ) : null}
        </React.Fragment>
      );
    });

    return (
      <div className={css.moduleList}>
        {AddModuleBtn}
        {Modules}
      </div>
    );
  };

  renderCourseLevelAssignments = assignments => {
    const Assignments = assignments.map(asgnmt => {
      if (asgnmt.module !== null || asgnmt.lesson !== null) {
        return null;
      }
      return (
        <AssignmentCard
          assignment={asgnmt}
          key={asgnmt.id}
          id={asgnmt.id}
          modify={this.addHandler}
        />
      );
    });

    return (
      <div className={css.itemBox}>
        <div className={css.itemList}>
          <div
            className={css.createAssignmentBtn}
            onClick={() => {
              this.addHandler("assignment");
            }}>
            <img src="../../../../static/assets/icon/add_circle_outline_24px_outlined.svg" />
            <span>Add new assignment</span>
          </div>
          {Assignments}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className={css.courseContent}>
        <div className={css.container}>
          <div className={css.section}>
            <span className={css.sectionTitle}>Modules</span>
            {this.renderModulesList()}
          </div>
          <div className={css.section}>
            <span className={css.sectionTitle}>Assignments</span>
            {this.renderCourseLevelAssignments(this.state.course.assignments)}
          </div>
          {this.renderAddNewForm()}
        </div>
      </div>
    );
  }
}

export default CourseContent;
