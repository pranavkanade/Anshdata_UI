import React, { Component } from "react";
import {
  Modal,
  Button,
  Segment,
  Header,
  Form,
  Divider,
  Grid,
  Dropdown
} from "semantic-ui-react";

import Router from "next/router";

import { createAssignmentHandler } from "../../../Requests/courseCreation";

import css from "./assignment.scss";

class AssignmentForm extends Component {
  state = {
    shouldOpen: false,
    title: "",
    instruction: "",
    reference: "",
    moduleId: this.props.moduleId,
    lessonId: this.props.lessonId,
    modList: this.props.course.modules,
    creditPoints: "0"
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  createAssignment = () => {
    console.log("[Assignment/Form.js] Create Assignment clicked");
    const assignmentData = {
      title: this.state.title,
      instruction: this.state.instruction,
      reference: this.state.reference,
      lesson:
        this.state.lessonId === null || this.state.lessonId === 0
          ? ""
          : this.state.lessonId,
      module: this.state.moduleId,
      course: this.props.course.id,
      credit_points: this.state.creditPoints
    };
    createAssignmentHandler(assignmentData, this.props.assignmentId);
    const page = window.location.pathname;
    Router.push(page);
    this.props.closeHandler();
  };

  creditSelectionHandler = (event, { value }) => {
    // console.log("[Assignment/Form.js] creaditSelection ", value);
    this.setState({ creditPoints: value });
  };

  renderCreditPointsChoise = () => {
    console.log("THe credit point choise : ", this.state.creditPoints);
    return (
      <div>
        <span>Credit Points</span>
        <div className={css.creditPoints}>
          <button
            className={css.sub}
            onClick={() => {
              let creds = Math.ceil(parseInt(this.state.creditPoints));
              creds = creds <= 0 ? 0 : creds - 1;
              this.setState({ creditPoints: creds });
            }}>
            <img src="../../../../../static/assets/icon/remove_24px_outlined.svg" />
          </button>
          <span>{String(this.state.creditPoints)}</span>
          <button
            className={css.add}
            onClick={() => {
              let creds = Math.ceil(parseInt(this.state.creditPoints));
              creds = creds >= 10 ? 10 : creds + 1;
              this.setState({ creditPoints: creds });
            }}>
            <img src="../../../../../static/assets/icon/add_24px_outlined.svg" />
          </button>
        </div>
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
          id: mod.id,
          text: mod.title,
          value: mod.id
        };
      });
    } catch (err) {
      console.log("did not pull up the mod list yet");
    }

    return (
      <>
        <span>Module</span>
        <Dropdown
          options={modOptions}
          fluid
          selection
          clearable
          className={css.inp + " " + css.drpDn}
          defaultValue={this.state.moduleId}
          onChange={this.moduleSelectionHandler}
        />
      </>
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
          return mod.id === this.state.moduleId;
        })
      };

      console.log(mod);
      lessonOptions = mod.lessons.map(each_lesson => {
        return {
          id: each_lesson.id,
          text: each_lesson.title,
          value: each_lesson.id
        };
      });
    } catch (err) {
      console.log("Failed to get the list of lessons");
    }

    // console.log("lesson options", lessonOptions);

    return (
      <>
        <span>Lesson</span>
        <Dropdown
          options={lessonOptions}
          fluid
          selection
          clearable
          className={css.inp + " " + css.drpDn}
          defaultValue={this.state.lessonId}
          onChange={this.lessonSelectionHandler}
        />
      </>
    );
  };

  render() {
    const open = this.state.shouldOpen;
    return (
      <Modal
        open={open}
        onClose={this.props.closeHandler}
        closeOnDimmerClick={false}
        closeOnEscape={false}
        centered={false}>
        <Modal.Header>
          Add New Assignment
          <Button onClick={this.props.closeHandler} negative floated="right">
            close
          </Button>
        </Modal.Header>
        <Modal.Content>
          <Segment basic>
            <h3>{this.props.course.title}</h3>
            <Form>
              {this.renderModuleChoise()}
              {this.renderLessonChoise()}
              <span>Assignment Title</span>
              <Form.Input
                placeholder="Assignment 1: Basics of Computer Science"
                value={this.state.title}
                name="title"
                size="large"
                className={css.inp}
                onChange={event => this.changeHandler(event)}
              />
              <span>Assignment Instructions</span>
              <Form.TextArea
                rows={6}
                placeholder="Describe purpose of this module in short..."
                value={this.state.instruction}
                name="instruction"
                className={css.inp}
                onChange={event => this.changeHandler(event)}
              />
              {this.renderCreditPointsChoise()}
              <span>Reference (Help)</span>
              <Form.TextArea
                rows={6}
                placeholder="May add pointers for the user to solve the assignment ..."
                value={this.state.reference}
                name="reference"
                className={css.inp}
                onChange={event => this.changeHandler(event)}
              />
              <Divider hidden />
              <div className={css.reverse}>
                <button type="submit" onClick={this.createAssignment}>
                  <span>
                    {this.state.type === "create" ? "Create" : "Save"}
                  </span>
                  <img src="../../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
                </button>
              </div>
            </Form>
          </Segment>
        </Modal.Content>
      </Modal>
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
      title: assignment.title,
      instruction: assignment.instruction,
      reference: assignment.reference,
      lesson: assignment.lessonId,
      module: assignment.moduleId,
      creditPoints: assignment.creditPoints
    });
  };

  componentDidMount() {
    console.log("[Contrib/Assignment/Form.js] component did mount");
    this.getaAssignmentToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

export default AssignmentForm;
