import React, { Component } from "react";
import FormModal from "./formmodal";
import {
  Form,
  Input,
  SelectPicker,
  InputNumber,
  Schema,
  Button,
  ButtonToolbar
} from "rsuite";
import CustomField from "./customformfield";
import Router from "next/router";

import { createAssignmentHandler } from "../../../Requests/courseCreation";

import css from "./assignment.scss";

const { StringType } = Schema.Types;

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
      module: this.props.moduleId === 0 ? "" : this.props.moduleId,
      course: this.props.course.id,
      credit_points: 0
    }
  };

  assignmentFormModel = Schema.Model({
    title: StringType().isRequired("This field is required."),
    instruction: StringType().isRequired("This field is required.")
  });

  handleChange = value => {
    this.setState({
      assignmentForm: value
    });
  };

  createAssignment = () => {
    createAssignmentHandler(
      this.state.assignmentForm,
      this.props.assignmentId
    );
    const page = window.location.pathname;
    Router.push(page);
    this.props.closeHandler();
  };

  creditSelectionHandler = (event, { value }) => {
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

  lessonSelectionHandler = (event, { value }) => {
    this.setState({ lessonId: value });
  };

  renderLessonChoise = () => {
    // TODO: This function is not working properly
    let lessonOptions = [];
    try {
      const mod = {
        ...this.state.modList.find(mod => {
          return mod.id === this.props.moduleId;
        })
      };

      lessonOptions = mod.lessons.map(each_lesson => {
        return {
          label: each_lesson.title,
          value: each_lesson.id
        };
      });
    } catch (err) {
      console.log("Failed to get the list of lessons");
    }
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
          ref={ref => (this.assignmentForm = ref)}
          model={this.assignmentFormModel}
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
            <ButtonToolbar>
              <Button
                type="submit"
                onClick={() => {
                  if (!this.assignmentForm.check()) {
                    return;
                  }
                  this.createAssignment();
                }}>
                <span>{this.state.type === "create" ? "Create" : "Save"}</span>
                <img src="../../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
              </Button>
            </ButtonToolbar>
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
    this.getaAssignmentToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

export default AssignmentForm;
