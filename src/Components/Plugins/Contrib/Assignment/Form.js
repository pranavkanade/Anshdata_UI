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

import createAssignmentHandler from "./Action";

class AssignmentForm extends Component {
  state = {
    shouldOpen: false,
    title: "",
    instruction: "",
    reference: "",
    module: 0,
    lesson: 0,
    creditPoints: 0,
    modList: []
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
      lesson: this.state.lesson === 0 ? "" : this.state.lesson,
      module: this.state.module,
      course: this.props.course.id,
      credit_points: String(this.state.creditPoints)
    };
    createAssignmentHandler(assignmentData);
    this.props.closeHandler();
  };

  getModuleList = async () => {
    console.log(
      "[Assignment/Form.js] get the list of modules of the course : ",
      this.props.course.id
    );

    const GET_MODULES_LIST = `http://127.0.0.1:8000/api/course/${
      this.props.course.id
    }/mod/`;

    try {
      await fetch(GET_MODULES_LIST, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => this.setState({ modList: data }));
    } catch (err) {
      console.log(
        "[Assignment/Form.js] Error when getting a list of modules : ",
        err
      );
    }
  };

  creditSelectionHandler = (event, { value }) => {
    console.log("[Assignment/Form.js] creaditSelection ", value);
    this.setState({ creditPoints: value });
  };

  renderCreditPointsChoise = () => {
    const options = [
      { key: 1, text: "1", value: 1 },
      { key: 2, text: "2", value: 2 },
      { key: 3, text: "3", value: 3 },
      { key: 4, text: "4", value: 4 },
      { key: 5, text: "5", value: 5 },
      { key: 6, text: "6", value: 6 },
      { key: 7, text: "7", value: 7 },
      { key: 8, text: "8", value: 8 },
      { key: 9, text: "9", value: 9 },
      { key: 10, text: "10", value: 10 }
    ];

    return (
      <>
        <Header size="tiny">Credit Points</Header>
        <Dropdown
          placeholder="Credit Points"
          clearable
          fluid
          options={options}
          selection
          onChange={this.creditSelectionHandler}
        />
      </>
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
        <Header size="tiny">Module</Header>
        <Dropdown
          options={modOptions}
          fluid
          selection
          defaultValue={
            modOptions.length !== 0
              ? modOptions[modOptions.length - 1].value
              : null
          }
          onChange={this.moduleSelectionHandler}
        />
      </>
    );
  };

  lessonSelectionHandler = (event, { value }) => {
    this.setState({ lesson: value });
  };

  renderLessonChoise = () => {
    // TODO: This function is not working properly
    console.log("[Assignment/Form.js] List the lessons");
    let lessonOptions = [];
    try {
      const mod = {
        ...this.state.modList.find(mod => {
          return mod.id === this.state.module;
        })
      };

      console.log(mod);
      lessonOptions = mod.lessons.map(each_lesson => {
        return {
          id: each_lesson.id,
          text: each_lesson.text,
          value: each_lesson.id
        };
      });
    } catch (err) {
      console.log("Failed to get the list of lessons");
    }

    return (
      <>
        <Header size="tiny">Lesson</Header>
        <Dropdown
          options={lessonOptions}
          fluid
          selection
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
            <Header>{this.props.course.title}</Header>
            <Form onSubmit={this.createAssignment}>
              {this.renderModuleChoise()}
              {this.renderLessonChoise()}
              <Header size="tiny">Assignment Title</Header>
              <Form.Input
                placeholder="Assignment 1: Basics of Computer Science"
                value={this.state.title}
                name="title"
                size="large"
                onChange={event => this.changeHandler(event)}
              />
              <Header size="tiny">Assignment Instructions</Header>
              <Form.TextArea
                rows={6}
                placeholder="Describe purpose of this module in short..."
                value={this.state.instruction}
                name="instruction"
                onChange={event => this.changeHandler(event)}
              />
              {this.renderCreditPointsChoise()}
              <Header size="tiny">Reference (Help)</Header>
              <Form.TextArea
                rows={6}
                placeholder="May add pointers for the user to solve the assignment ..."
                value={this.state.reference}
                name="reference"
                onChange={event => this.changeHandler(event)}
              />
              <Divider hidden />
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column />
                  <Grid.Column>
                    <Form.Button
                      type="submit"
                      color="twitter"
                      fluid
                      size="big">
                      Create
                    </Form.Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }

  componentDidMount() {
    console.log("[Contrib/Assignment/Form.js] component did mount");
    this.setState({ shouldOpen: this.props.open });
    this.getModuleList();
  }
}

export default AssignmentForm;
