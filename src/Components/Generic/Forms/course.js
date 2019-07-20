import React, { Component } from "react";
import {
  Form,
  SelectPicker,
  TagPicker,
  InputNumber,
  Input,
  Schema,
  Button,
  ButtonToolbar
} from "rsuite";
import FormModal from "./formmodal";
import CustomField from "./customformfield";
import { getCategoryList } from "../../../Requests/Category";
import { getTagList } from "../../../Requests/Tag";
import { createCourseHandler } from "../../../Requests/courseCreation";
import css from "./course.scss";
import Router from "next/router";
import { connect } from "react-redux";
import { Whisper, Tooltip } from "rsuite";

const { StringType, NumberType } = Schema.Types;
class CourseForm extends Component {
  state = {
    courseId: null,
    shouldOpen: false,
    courseForm: {
      title: "",
      subject: "",
      category: "",
      credit_points: 0,
      tagged_to: [],
      description: "",
      isPublished: false
    }
  };

  courseFormModel = Schema.Model({
    title: StringType().isRequired("This field is required."),
    subject: StringType().isRequired("This field is required."),
    category: NumberType().isRequired("This field is required.")
  });

  catSaveHandler = data => {
    this.setState({ catList: data });
  };

  tagSaveHandler = data => {
    this.setState({ tagList: data });
  };

  creditSelectionHandler = (event, { value }) => {
    this.setState({ creditPoints: value });
  };

  categorySelectionHandler = (event, { value }) => {
    this.setState({ category: value });
  };

  tagSelectionHandler = (event, { value }) => {
    this.setState({ tagged_to: value });
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

  handleChange = value => {
    this.setState({
      courseForm: value
    });
  };

  createCourse = async () => {
    const courseId = await createCourseHandler(
      this.state.courseForm,
      this.state.courseId
    );
    Router.push(
      `/contribute/draft/${
        courseId !== undefined && courseId !== null
          ? courseId
          : this.state.courseId
      }`
    );
    if (
      this.props.closeHandler !== null ||
      this.props.closeHandler !== undefined
    ) {
      this.props.closeHandler();
    }
  };

  renderCategoryChoise = () => {
    let catOptions = [];
    try {
      catOptions = this.state.catList.map(cat => {
        return {
          label: cat.title,
          value: cat.id
        };
      });
    } catch (err) {
      console.log("did not pull up the cat list yet");
    }

    return (
      <CustomField
        className={css.ad_cat_choise}
        size="lg"
        name="category"
        label="Category"
        accepter={SelectPicker}
        style={{ display: "inline-block", width: 200 }}
        data={catOptions}
      />
    );
  };

  renderTagsChoise = () => {
    let tagsOptions = [];
    try {
      tagsOptions = this.state.tagList.map(tag => {
        return {
          label: tag.title,
          value: tag.id
        };
      });
    } catch (err) {
      console.log("did not pull up the tag list yet");
    }

    return (
      <CustomField
        className={css.ad_tag_choise}
        placeholder="Select or Search .."
        size="lg"
        name="tagged_to"
        label="Tags"
        accepter={TagPicker}
        data={tagsOptions}
        block
      />
    );
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

  renderCreateBtn = () => {
    if (this.props.isAuthenticated) {
      return (
        <ButtonToolbar>
          <Button
            type="submit"
            onClick={() => {
              if (!this.courseForm.check()) {
                return;
              }
              this.createCourse();
            }}>
            <span>{this.props.edit === undefined ? "Create" : "Save"}</span>
            <img src="../../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
          </Button>
        </ButtonToolbar>
      );
    } else {
      return (
        <Whisper
          trigger="hover"
          placement="top"
          speaker={
            <Tooltip>
              User should be logged in to Enroll to this course.
            </Tooltip>
          }>
          <button type="submit" onClick={this.props.askToJoin}>
            <span>{this.props.edit === undefined ? "Create" : "Save"}</span>
            <img
              src="/static/assets/icon/lock_24px_outlined.svg"
              alt="locked"
            />
          </button>
        </Whisper>
      );
    }
  };

  renderForm() {
    // TODO: Add button to send it for review
    // TODO: Add a muted button to publish the courses
    return (
      <Form
        fluid
        ref={ref => (this.courseForm = ref)}
        model={this.courseFormModel}
        onChange={this.handleChange}
        formValue={this.state.courseForm}>
        <CustomField
          className={css.ad_course_form_input}
          name="title"
          label="Title"
          placeholder="Zero to 'Hero' !"
          message="required"
          accepter={Input}
        />
        <CustomField
          className={css.ad_course_form_input}
          name="subject"
          label="Subject"
          placeholder="Computer Science"
          message="required"
          accepter={Input}
        />
        <div className={css.ad_cat_n_credit_pickers}>
          {this.renderCategoryChoise()}
          {this.renderCreditPointsChoise()}
        </div>
        {this.renderTagsChoise()}
        <CustomField
          className={css.ad_course_form_input}
          label="Description"
          name="description"
          placeholder="Describe your course in short..."
          rows={10}
          componentClass="textarea"
        />
        <div className={css.ad_reverse}>{this.renderCreateBtn()}</div>
      </Form>
    );
  }

  render() {
    if (this.props.edit === undefined) {
      return <>{this.renderForm()}</>;
    } else {
      const open = this.state.shouldOpen;
      return (
        <FormModal
          open={open}
          title={
            this.state.type === "create" ? "Add New Course" : "Modify Course"
          }
          closeHandler={this.props.closeHandler}>
          <div className={css.ad_form_pane}>{this.renderForm()}</div>
        </FormModal>
      );
    }
  }

  getCourseToUpdate = () => {
    if (this.props.course === undefined) {
      return null;
    }
    const course = this.props.course;
    this.handleChange({
      title: course.title,
      subject: course.subject,
      category: course.category.id,
      credit_points: course.credit_points,
      description: course.description,
      tagged_to: course.tagged_to.map(tag => tag.id)
    });
    this.setState({ courseId: course.id });
  };

  componentDidMount() {
    getCategoryList(this.catSaveHandler);
    getTagList(this.tagSaveHandler);
    this.getCourseToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
}

export default connect(mapStateToProps)(CourseForm);
