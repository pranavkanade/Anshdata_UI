import React, { Component } from "react";
import FormModal from "./formmodal";
import { Form, Input, SelectPicker, InputNumber } from "rsuite";
import CustomField from "./customformfield";
import Router from "next/router";

import { createAssignmentHandler } from "../../../Requests/courseCreation";

import css from "./assignment.scss";

class AssignmentForm extends Component {
  state = {
    shouldOpen: false,
    modList: this.props.course.modules,
    type: "create",
    assignmentForm: {
      title: "",
      instruction: "",
      reference: "",
      lesson: "",
      module: this.props.moduleId,
      course: this.props.course.id,
      credit_points: 0
    }
  };

  handleChange = value => {
    this.setState({
      assignmentForm: value
    });
  };

  createAssignment = () => {
    console.log(
      "[Assignment/Form.js] Create Assignment clicked",
      this.state.assignmentForm
    );
    createAssignmentHandler(
      this.state.assignmentForm,
      this.props.assignmentId
    );
    const page = window.location.pathname;
    Router.push(page);
    this.props.closeHandler();
  };

  creditSelectionHandler = (event, { value }) => {
    // console.log("[Assignment/Form.js] creaditSelection ", value);
    this.setState({ creditPoints: value });
  };

  renderCreditPointsChoise = () => {
    return (
      <div className={css.ad_credits_choise}>
        <CustomField
          style={{ width: 100 }}
          defaultValue={0}
          max={10}
          min={0}
          size="lg"
          name="credit_points"
          label="Credit Points"
          accepter={InputNumber}
        />
      </div>
    );
  };

  moduleSelectionHandler = (event, { value }) => {
    this.setState({ module: value });
  };

  renderModuleChoise = () => {
    console.log("[Assignment/Form.js] List the modules");
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

    console.log("Module Options ", modOptions);
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

  lessonSelectionHandler = (event, { value }) => {
    this.setState({ lessonId: value });
  };

  renderLessonChoise = () => {
    // TODO: This function is not working properly
    // console.log("[Assignment/Form.js] List the lessons,", this.state.modList);
    let lessonOptions = [];
    try {
      const mod = {
        ...this.state.modList.find(mod => {
          return mod.id === this.props.moduleId;
        })
      };

      console.log(mod);
      lessonOptions = mod.lessons.map(each_lesson => {
        return {
          label: each_lesson.title,
          value: each_lesson.id
        };
      });
    } catch (err) {
      console.log("Failed to get the list of lessons");
    }
    console.log("Lesson Options", lessonOptions);
    return (
      <CustomField
        className={css.ad_mod_choise}
        size="lg"
        name="lesson"
        label="Lesson"
        accepter={SelectPicker}
        block
        data={lessonOptions}
      />
    );
  };

  render() {
    const open = this.state.shouldOpen;

    return (
      <FormModal
        open={open}
        title={
          this.state.type === "create" ? "Add New Course" : "Modify Course"
        }
        closeHandler={this.props.closeHandler}>
        <h3>{this.props.course.title}</h3>
        <Form
          fluid
          onChange={this.handleChange}
          formValue={this.state.assignmentForm}>
          {this.renderModuleChoise()}
          {this.renderLessonChoise()}
          <CustomField
            className={css.ad_inp}
            name="title"
            label="Assignment Title"
            placeholder="Assignment 1: Basics of Computer Science"
            message="required"
            accepter={Input}
          />
          <CustomField
            className={css.ad_inp}
            label="Assignment Instructions"
            name="instruction"
            placeholder="Describe this assignment in short .."
            rows={6}
            componentClass="textarea"
          />
          {this.renderCreditPointsChoise()}
          <CustomField
            className={css.ad_inp}
            label="Reference (Extra)"
            name="reference"
            placeholder="Add references .."
            rows={6}
            componentClass="textarea"
          />
          <div className={css.reverse}>
            <button type="submit" onClick={this.createAssignment}>
              <span>{this.state.type === "create" ? "Create" : "Save"}</span>
              <img src="../../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
            </button>
          </div>
        </Form>
      </FormModal>
    );
  }

  getaAssignmentToUpdate = () => {
    if (
      this.props.course === null ||
      this.props.assignmentId === null ||
      this.props.moduleId === null ||
      this.props.lessonId === null ||
      this.props.assignmentId === 0
    ) {
      console.log("Creating new assignment");
      return null;
    }
    const course = this.props.course;
    const assignment = {
      ...course.assignments.find(mod => {
        return mod.id === this.props.assignmentId;
      })
    };

    console.log("assignment to update", assignment);
    this.setState({
      assingToUpdate: assignment,
      assignmentForm: {
        title: assignment.title,
        instruction: assignment.instruction,
        reference: assignment.reference,
        lesson: assignment.lesson,
        module: assignment.module,
        credit_points: assignment.credit_points
      },
      type: "edit"
    });
  };

  componentDidMount() {
    console.log("[Contrib/Assignment/Form.js] component did mount");
    this.getaAssignmentToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

export default AssignmentForm;
