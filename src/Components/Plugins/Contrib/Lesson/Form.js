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

import createLessonHandler from "./Action";

class LessonForm extends Component {
  state = {
    shouldOpen: false,
    title: "",
    description: "",
    lecture: "",
    module: 0,
    modList: []
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("[Lesson/Form.js] onChangeHandler");
    console.log(name, value);
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  createLesson = () => {
    console.log("[Lesson/Form.js] Create Lesson clicked");
    const lessonData = {
      title: this.state.title,
      description: this.state.description,
      lecture: this.state.lecture,
      module: this.state.module
    };
    createLessonHandler(lessonData);
    this.props.closeHandler();
  };

  getModuleList = async () => {
    console.log(
      "[Lesson/Form.js] get the list of modules of the course : ",
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
        "[Lesson/Form.js] Error when getting a list of modules : ",
        err
      );
    }
  };

  moduleSelectionHandler = (event, { value }) => {
    this.setState({ module: value });
  };

  renderModuleChoise = () => {
    console.log("[Lesson/Form.js] List the modules");
    let modOptions = [];
    try {
      modOptions = this.state.modList.map(mod => {
        return {
          id: mod.idm,
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
          Add New Lesson
          <Button onClick={this.props.closeHandler} negative floated="right">
            close
          </Button>
        </Modal.Header>
        <Modal.Content>
          <Segment basic>
            <Header>{this.props.course.title}</Header>
            <Form onSubmit={this.createLesson}>
              {this.renderModuleChoise()}
              <Header size="tiny">Lesson Title</Header>
              <Form.Input
                placeholder="Lesson 1: Basics of Computer Science"
                value={this.state.title}
                name="title"
                size="large"
                onChange={event => this.changeHandler(event)}
              />
              <Header size="tiny">{"Lecture Video Link (URL)"}</Header>
              <Form.Input
                placeholder="https://"
                type="url"
                value={this.state.lecture}
                name="lecture"
                onChange={event => this.changeHandler(event)}
              />
              <Header size="tiny">Lesson Description</Header>
              <Form.TextArea
                rows={6}
                placeholder="Describe purpose of this module in short..."
                value={this.state.description}
                name="description"
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
    console.log("[Contrib/Lesson/Form.js] component did mount");
    this.setState({ shouldOpen: this.props.open });
    this.getModuleList();
  }
}

export default LessonForm;
