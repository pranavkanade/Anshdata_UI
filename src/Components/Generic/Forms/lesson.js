import React, { Component } from "react";
import FormModal from "./formmodal";
import { Form, Input, SelectPicker } from "rsuite";
import CustomField from "./customformfield";
import Router from "next/router";

import { createLessonHandler } from "../../../Requests/courseCreation";
import css from "./lesson.scss";

class LessonForm extends Component {
  state = {
    shouldOpen: false,
    module: this.props.moduleId,
    modList: this.props.course.modules,
    type: "create",
    lessonForm: {
      title: "",
      description: "",
      lecture: "",
      module: this.props.moduleId
    }
  };

  handleChange = value => {
    this.setState({
      lessonForm: value
    });
  };

  createLesson = () => {
    console.log(
      "[Lesson/Form.js] Create Lesson clicked",
      this.state.lessonForm
    );
    createLessonHandler(this.state.lessonForm, this.props.lessonId);
    const page = window.location.pathname;
    Router.push(page);
    this.props.closeHandler();
  };

  renderModuleChoise = () => {
    console.log("[Lesson/Form.js] List the modules");
    let modOptions = [];
    try {
      modOptions = this.state.modList.map(mod => {
        return {
          label: mod.title,
          value: mod.id
        };
      });
    } catch (err) {
      console.log("did not pull up the mod list yet");
    }

    return (
      <CustomField
        className={css.ad_mod_choise}
        size="lg"
        name="module"
        label="Module"
        accepter={SelectPicker}
        block
        data={modOptions}
      />
    );
  };

  render() {
    const open = this.state.shouldOpen;
    return (
      <FormModal
        open={open}
        closeHandler={this.props.closeHandler}
        title={
          this.state.type === "create" ? "Add New Lesson" : "Modify Lesson"
        }>
        <h3>{this.props.course.title}</h3>
        <Form
          fluid
          onChange={this.handleChange}
          formValue={this.state.lessonForm}>
          {this.renderModuleChoise()}
          <CustomField
            className={css.ad_inp}
            name="title"
            label="Lesson Title"
            placeholder="Lesson 1: Basics of Computer Science"
            message="required"
            accepter={Input}
          />
          <CustomField
            className={css.ad_inp}
            name="lecture"
            label="Lecture Video Link (URL)"
            placeholder="https://"
            accepter={Input}
            type="url"
          />
          <CustomField
            className={css.ad_inp}
            label="Lesson Description"
            name="description"
            placeholder="Describe purpose of this lesson in short..."
            rows={6}
            componentClass="textarea"
          />
          <div className={css.ad_reverse}>
            <button type="submit" onClick={this.createLesson}>
              <span>{this.state.type === "create" ? "Create" : "Save"}</span>
              <img src="../../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
            </button>
          </div>
        </Form>
      </FormModal>
    );
  }

  getLessonToUpdate = () => {
    if (
      this.props.course === null ||
      this.props.moduleId === null ||
      this.props.lessonId === null ||
      this.props.lessonId === undefined ||
      this.props.lessonId === 0
    ) {
      console.log("Creating new lesson");
      this.setState({ type: "create" });
      return null;
    }
    const course = this.props.course;
    const mod = {
      ...course.modules.find(mod => {
        return mod.id === this.props.moduleId;
      })
    };

    const lesson = {
      ...mod.lessons.find(lsn => {
        return lsn.id === this.props.lessonId;
      })
    };
    console.log("lesson to update", lesson);
    this.setState({
      lsnToUpdate: lesson,
      lessonForm: {
        title: lesson.title,
        description: lesson.description,
        lecture: lesson.lecture,
        module: lesson.module
      },
      type: "edit"
    });
  };

  componentDidMount() {
    console.log("[Contrib/Lesson/Form.js] component did mount");
    this.getLessonToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

export default LessonForm;
