import React, { Component } from "react";
import css from "./content.scss";

import {
  ModuleCardDraft,
  DetailedModuleCard
} from "../../../Generic/Cards/ModuleCard";

import ModuleForm from "../../../Generic/Forms/module";

class CourseContent extends Component {
  state = {
    course: this.props.course,
    activeModule: 0,
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

  closeHandler = () => {
    this.setState({
      shouldOpenAddModule: false,
      shouldOpenAddLesson: false,
      shouldOpenAddAssignment: false,
      elementBeingAdded: ""
    });
  };

  addHandler = (
    btn,
    moduleId = null,
    lessonId = null,
    assignmentId = null
  ) => {
    console.log("[Contrib/Course.js] Add New Clicked : ", btn);
    if (btn === "module") {
      this.setState({
        shouldOpenAddModule: true,
        elementBeingAdded: btn
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
        <>
          <ModuleCardDraft
            module={mod}
            key={mod.id}
            select={this.setSelectedModule}
          />
          {this.state.activeModule === mod.id ? (
            <DetailedModuleCard
              module={mod}
              key={`detailed_${mod.id}`}
              close={this.closeSelectedModule}
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
