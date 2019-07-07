import React, { Component } from "react";
import FormModal from "./formmodal";
import { Form, Input } from "rsuite";
import CustomField from "./customformfield";
import Router from "next/router";

import { createModuleHandler } from "../../../Requests/courseCreation";
import css from "./module.scss";

class ModuleForm extends Component {
  state = {
    courseId: this.props.course.id,
    type: "create",
    moduleForm: {
      title: "",
      description: "",
      reference: "",
      course: this.props.course.id
    }
  };

  handleChange = value => {
    this.setState({
      moduleForm: value
    });
  };

  createModule = async () => {
    console.log(
      "[Module/Form.js] Create Module clicked",
      this.state.moduleForm
    );
    const courseId = await createModuleHandler(
      this.state.moduleForm,
      this.props.moduleId
    );
    const page = window.location.pathname;
    Router.push(page);
    this.props.closeHandler();
  };

  render() {
    return (
      <FormModal
        open={true}
        closeHandler={this.props.closeHandler}
        title={
          this.state.type === "create" ? "Add New Module" : "Modify Module"
        }>
        <h3>{this.props.course.title}</h3>
        <Form
          fluid
          onChange={this.handleChange}
          formValue={this.state.moduleForm}>
          <CustomField
            className={css.ad_inp}
            name="title"
            label="Module Title"
            placeholder="Introduction"
            message="required"
            accepter={Input}
          />
          <CustomField
            className={css.ad_inp}
            label="Description"
            name="description"
            placeholder="Describe this module in short..."
            rows={6}
            componentClass="textarea"
          />
          <CustomField
            className={css.ad_inp}
            label="Reference (Extra)"
            name="reference"
            placeholder="Add references .."
            rows={6}
            componentClass="textarea"
          />
          <div className={css.ad_reverse}>
            <button type="submit" onClick={this.createModule}>
              <span>{this.state.type === "create" ? "Create" : "Save"}</span>
              <img src="../../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
            </button>
          </div>
        </Form>
      </FormModal>
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
      moduleForm: {
        title: mod.title,
        description: mod.description,
        reference: mod.reference
      },
      type: "edit"
    });
  };

  componentDidMount() {
    console.log("[Contrib/Module/Form.js] component did mount");
    this.getModuleToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

export default ModuleForm;
