import React, { Component } from "react";
import FormModal from "./formmodal";
import { Form, Input, Button, ButtonToolbar, Schema } from "rsuite";
import CustomField from "./customformfield";
import Router from "next/router";

import { createModuleHandler } from "../../../Requests/courseCreation";
import css from "./module.scss";
import { connect } from "react-redux";
import { updateDetailedDraftCourse } from "../../../store/actions";

const { StringType } = Schema.Types;

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

  moduleFormModel = Schema.Model({
    title: StringType().isRequired("This field is required.")
  });

  handleChange = value => {
    this.setState({
      moduleForm: value
    });
  };

  createModule = async () => {
    const resp = await createModuleHandler({
      modData: this.state.moduleForm,
      modId: this.props.moduleId
    });
    if (resp.ok) {
      const modResp = {
        ...resp,
        data: {
          id: this.props.course.id
        }
      };
      this.props.updateDetailedDraftCourse(modResp);
    } else {
      this.props.updateDetailedDraftCourse(resp);
    }

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
          ref={ref => (this.moduleForm = ref)}
          model={this.moduleFormModel}
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
            <ButtonToolbar>
              <Button
                type="submit"
                onClick={() => {
                  if (!this.moduleForm.check()) {
                    return;
                  }
                  this.createModule();
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

  getModuleToUpdate = () => {
    if (
      this.props.course === null ||
      this.props.moduleId === null ||
      this.props.moduleId === undefined ||
      this.props.moduleId === 0
    ) {
      this.setState({ type: "create" });
      return null;
    }
    const course = this.props.course;
    const mod = {
      ...course.modules.find(mod => {
        return mod.id === this.props.moduleId;
      })
    };
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
    this.getModuleToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

const mapDispatchToProps = {
  updateDetailedDraftCourse
};

export default connect(
  null,
  mapDispatchToProps
)(ModuleForm);
