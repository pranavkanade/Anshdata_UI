import React, { Component } from "react";
import FormModal from "./formmodal";
import {
  Form,
  Input,
  SelectPicker,
  Schema,
  Button,
  ButtonToolbar
} from "rsuite";
import CustomField from "./customformfield";
import Router from "next/router";

import { createLessonHandler } from "../../../Requests/courseCreation";
import css from "./lesson.scss";
import { connect } from "react-redux";
import { updateDetailedDraftCourse } from "../../../store/actions";

const { StringType, NumberType } = Schema.Types;

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

  lessonFormModel = Schema.Model({
    title: StringType().isRequired("This field is required."),
    module: NumberType().isRequired("This field is required.")
  });

  handleChange = value => {
    this.setState({
      lessonForm: value
    });
  };

  createLesson = async () => {
    const resp = await createLessonHandler({
      lsnData: this.state.lessonForm,
      lsnId: this.props.lessonId
    });
    if (!resp.ok) {
      this.props.updateDetailedDraftCourse(resp);
    } else {
      const modResp = {
        ...resp,
        data: {
          id: this.props.course.id
        }
      };
      this.props.updateDetailedDraftCourse(modResp);
    }
    this.props.closeHandler();
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
    } catch (err) {}

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
          ref={ref => (this.lessonForm = ref)}
          model={this.lessonFormModel}
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
            <ButtonToolbar>
              <Button
                type="submit"
                onClick={() => {
                  if (!this.lessonForm.check()) {
                    return;
                  }
                  this.createLesson();
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

  getLessonToUpdate = () => {
    if (
      this.props.course === null ||
      this.props.moduleId === null ||
      this.props.lessonId === null ||
      this.props.lessonId === undefined ||
      this.props.lessonId === 0
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

    const lesson = {
      ...mod.lessons.find(lsn => {
        return lsn.id === this.props.lessonId;
      })
    };
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
    this.getLessonToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

const mapDispatchToProps = {
  updateDetailedDraftCourse
};

export default connect(
  null,
  mapDispatchToProps
)(LessonForm);
