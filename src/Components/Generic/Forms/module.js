import React, { Component } from "react";
import {
  Modal,
  Button,
  Segment,
  Header,
  Form,
  Divider,
  Grid
} from "semantic-ui-react";
import Router from "next/router";

import { createModuleHandler } from "../../../Requests/courseCreation";
import css from "./module.scss";

class ModuleForm extends Component {
  state = {
    courseId: this.props.course.id,
    shouldOpen: false,
    title: "",
    description: "",
    reference: "",
    type: "create"
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log("[Module/Form.js] onChangeHandler");
    // console.log(name, value);
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  createModule = async () => {
    console.log("[Module/Form.js] Create Module clicked");
    const moduleData = {
      title: this.state.title,
      description: this.state.description,
      reference: this.state.reference,
      course: this.props.course.id
    };
    const courseId = await createModuleHandler(
      moduleData,
      this.props.moduleId
    );
    Router.push(`/contribute/draft/${courseId}`);
    this.props.closeHandler();
  };

  render() {
    const open = this.state.shouldOpen;
    return (
      <Modal
        size="large"
        open={true}
        onClose={this.props.closeHandler}
        closeOnDimmerClick={false}
        closeOnEscape={false}
        centered={false}>
        <Modal.Header>
          Add New Module
          <Button onClick={this.props.closeHandler} negative floated="right">
            close
          </Button>
        </Modal.Header>
        <Modal.Content>
          <Segment basic>
            <h3>{this.props.course.title}</h3>
            <Form onSubmit={this.createModule}>
              <span>Module Title</span>
              <Form.Input
                placeholder="Introduction"
                value={this.state.title}
                name="title"
                size="large"
                className={css.inp}
                onChange={event => this.changeHandler(event)}
              />
              <span>Module Description</span>
              <Form.TextArea
                rows={6}
                className={css.inp}
                placeholder="Describe purpose of this module in short..."
                value={this.state.description}
                name="description"
                onChange={event => this.changeHandler(event)}
              />
              <span>{"References (Help)"}</span>
              <Form.TextArea
                rows={6}
                className={css.inp}
                placeholder="Add references .."
                value={this.state.reference}
                name="reference"
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

  getModuleToUpdate = () => {
    if (
      this.props.course === null ||
      this.props.moduleId === null ||
      this.props.moduleId === undefined ||
      this.props.moduleId === 0
    ) {
      console.log("Creating new module");
      this.setState({ type: "create" });
      return null;
    }
    const course = this.props.course;
    const mod = {
      ...course.modules.find(mod => {
        return mod.id === this.props.moduleId;
      })
    };
    console.log("mod to update", mod);
    this.setState({
      modToUpdate: mod,
      title: mod.title,
      description: mod.description,
      reference: mod.reference,
      type: "edit"
    });
  };

  componentDidMount() {
    console.log("[Contrib/Module/Form.js] component did mount");
    this.getModuleToUpdate();
    // this.setUpdateState();
    this.setState({ shouldOpen: this.props.open });
  }
}

export default ModuleForm;
