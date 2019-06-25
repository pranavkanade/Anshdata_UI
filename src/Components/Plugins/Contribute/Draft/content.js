import React, { Component } from "react";
import css from "./content.scss";

import {
  ModuleCardDraft,
  DetailedModuleCardDraft
} from "../../../Generic/Cards/ModuleCard";

import ModuleForm from "../../../Generic/Forms/module";
import LessonForm from "../../../Generic/Forms/lesson";

class CourseContent extends Component {
  state = {
    course: this.props.course,
    activeModule: 0,
    activeLesson: 0,
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
      activeLesson: 0
    });
  };

  addHandler = (
    btn,
    moduleId = null,
    lessonId = null,
    assignmentId = null
  ) => {
    console.log("[Contrib/Course.js] Add New Clicked : ", btn);
    if (btn === "lesson") {
      this.setState({
        shouldOpenAddLesson: true,
        elementBeingAdded: btn,
        activeModule: moduleId,
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
    console.log("[Contrib/Course.js] render add new form : ", btn);
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
    }
    // else if (btn === "assignment") {
    //   return (
    //     <AssignmentForm
    //       open={true}
    //       closeHandler={this.closeHandler}
    //       moduleId={this.state.moduleId}
    //       lessonId={this.state.lessonId}
    //       assignmentId={this.state.assignmentId}
    //       course={this.state.course}
    //       onSaveHandler={this.onSaveHandler}
    //     />
    //   );
    // }
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
        <>
          <ModuleCardDraft
            module={mod}
            key={mod.id}
            select={this.setSelectedModule}
            modify={this.modifySelectedModule}
          />
          {this.state.activeModule === mod.id &&
          !this.state.shouldOpenAddModule ? (
            <DetailedModuleCardDraft
              module={mod}
              key={`detailed_${mod.id}`}
              close={this.closeSelectedModule}
              addNewLesson={this.addHandler}
            />
          ) : null}
        </>
      );
    });

    return (
      <div className={css.moduleList}>
        {AddModuleBtn}
        {Modules}
      </div>
    );
  };

  render() {
    return (
      <div className={css.courseContent}>
        <span className={css.sectionTitle}>Modules</span>
        {this.renderModulesList()}
        {this.renderAddNewForm()}
      </div>
    );
  }
}

export default CourseContent;
