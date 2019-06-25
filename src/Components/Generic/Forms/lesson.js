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

import { createLessonHandler } from "../../../Requests/courseCreation";
import css from "./lesson.scss";

class LessonForm extends Component {
  state = {
    shouldOpen: false,
    title: "",
    description: "",
    lecture: "",
    module: this.props.moduleId,
    modList: this.props.course.modules,
    type: "create"
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log("[Lesson/Form.js] onChangeHandler");
    // console.log(name, value);
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
    createLessonHandler(lessonData, this.props.lessonId);
    const page = window.location.pathname;
    Router.push(page);
    this.props.closeHandler();
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
        <span>Module</span>
        <Dropdown
          options={modOptions}
          fluid
          selection
          className={css.inp + " " + css.drpDn}
          defaultValue={this.state.module}
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
            <h3>{this.props.course.title}</h3>
            <Form onSubmit={this.createLesson}>
              {this.renderModuleChoise()}
              <span>Lesson Title</span>
              <Form.Input
                placeholder="Lesson 1: Basics of Computer Science"
                value={this.state.title}
                name="title"
                size="large"
                className={css.inp}
                onChange={event => this.changeHandler(event)}
              />
              <span>{"Lecture Video Link (URL)"}</span>
              <Form.Input
                placeholder="https://"
                type="url"
                value={this.state.lecture}
                name="lecture"
                className={css.inp}
                onChange={event => this.changeHandler(event)}
              />
              <span>Lesson Description</span>
              <Form.TextArea
                rows={6}
                placeholder="Describe purpose of this module in short..."
                value={this.state.description}
                name="description"
                className={css.inp}
                onChange={event => this.changeHandler(event)}
              />
              <Divider hidden />
              <div className={css.reverse}>
                <button type="submit">
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
      title: lesson.title,
      description: lesson.description,
      lecture: lesson.lecture,
      module: lesson.module,
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
