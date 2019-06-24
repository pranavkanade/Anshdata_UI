import React, { Component } from "react";
import {
  Modal,
  Grid,
  Form,
  Dropdown,
  Divider,
  Segment,
  Header,
  Button
} from "semantic-ui-react";
import Link from "next/link";
import { getCategoryList } from "../../../Requests/Category";
import { createCourseHandler } from "../../../Requests/courseCreation";
import css from "./course.scss";
import Router from "next/router";

class CourseForm extends Component {
  state = {
    courseId: null,
    title: "",
    subject: "",
    category: "",
    tag: "",
    isPublished: false,
    credit_points: 0,
    description: "",
    shouldOpen: false
  };

  catSaveHandler = data => {
    this.setState({ catList: data });
  };

  creditSelectionHandler = (event, { value }) => {
    console.log("[Course/Form.js] creaditSelection ", value);
    this.setState({ creditPoints: value });
  };

  categorySelectionHandler = (event, { value }) => {
    this.setState({ category: value });
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

  getNewCourseData = () => {
    return {
      title: this.state.title,
      subject: this.state.subject,
      category: this.state.category,
      isPublished: this.state.isPublished,
      credit_points: this.state.credit_points,
      description: this.state.description
    };
  };

  createCourse = async () => {
    console.log("[Course/Form.js] Create Course clicked");
    const courseData = this.getNewCourseData();
    console.log(courseData);
    const courseId = await createCourseHandler(
      courseData,
      this.state.courseId
    );
    console.log("Course Created : ", courseId);
    Router.push(`/contribute/draft/${courseId}`);
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
          id: cat.id,
          text: cat.title,
          value: cat.id
        };
      });
      // console.log(catOptions);
    } catch (err) {
      console.log("did not pull up the cat list yet");
    }

    return (
      <>
        <span>Category</span>
        <Dropdown
          className={css.category}
          clearable
          fluid
          options={catOptions}
          selection
          defaultValue={this.state.category}
          onChange={this.categorySelectionHandler}
        />
      </>
    );
  };

  renderTagsChoise = () => {
    let tagsOptions = [];
    try {
      tagsOptions = this.state.catList.map(cat => {
        return {
          id: cat.id,
          text: cat.title,
          value: cat.id
        };
      });
      // console.log(catOptions);
    } catch (err) {
      console.log("did not pull up the cat list yet");
    }
    return (
      <div className={css.tags}>
        <span>Tags</span>
        <Dropdown
          clearable
          fluid
          options={tagsOptions}
          selection
          multiple
          defaultValue={this.state.tag}
        />
      </div>
    );
  };

  renderCreditPointsChoise = () => {
    return (
      <>
        <span>Credit Points</span>
        <div className={css.creditPoints}>
          <button
            className={css.sub}
            onClick={() => {
              let creds = Math.ceil(parseInt(this.state.credit_points));
              creds = creds <= 0 ? 0 : creds - 1;
              this.setState({ credit_points: creds });
            }}>
            <img src="../../../../../static/assets/icon/remove_24px_outlined.svg" />
          </button>

          <span>{this.state.credit_points}</span>
          <button
            className={css.add}
            onClick={() => {
              let creds = Math.ceil(parseInt(this.state.credit_points));
              creds = creds >= 10 ? 10 : creds + 1;
              this.setState({ credit_points: creds });
            }}>
            <img src="../../../../../static/assets/icon/add_24px_outlined.svg" />
          </button>
        </div>
      </>
    );
  };

  renderForm() {
    // TODO: Add button to send it for review
    // TODO: Add a muted button to publish the courses
    return (
      <Form>
        <span>Course Title</span>
        <Form.Input
          className={css.inp}
          placeholder="Zero to 'HERO' !!"
          value={this.state.title}
          name="title"
          size="large"
          onChange={event => this.changeHandler(event)}
        />
        <span>Subject</span>
        <Form.Input
          className={css.inp}
          placeholder="Computer Science"
          size="large"
          value={this.state.subject}
          name="subject"
          onChange={event => this.changeHandler(event)}
        />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>{this.renderCategoryChoise()}</Grid.Column>
            <Grid.Column>{this.renderCreditPointsChoise()}</Grid.Column>
          </Grid.Row>
        </Grid>
        {this.renderTagsChoise()}
        <div className={css.desc}>
          <span>Course Description</span>
          <Form.TextArea
            rows={10}
            placeholder="Describe your course in short..."
            value={this.state.description}
            name="description"
            onChange={event => this.changeHandler(event)}
          />
        </div>
        <div className={css.reverse}>
          <button type="submit" onClick={this.createCourse}>
            <span>{this.props.edit === undefined ? "Create" : "Save"}</span>
            <img src="../../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
          </button>
        </div>
      </Form>
    );
  }

  render() {
    if (this.props.edit === undefined) {
      return <>{this.renderForm()}</>;
    } else {
      const open = this.state.shouldOpen;
      return (
        <Modal
          open={open}
          onClose={this.props.closeHandler}
          closeOnDimmerClick={false}
          closeOnEscape={false}
          centered={false}>
          <Modal.Header>
            Edit Course
            <Button onClick={this.props.closeHandler} negative floated="right">
              close
            </Button>
          </Modal.Header>
          <Modal.Content>{this.renderForm()}</Modal.Content>
        </Modal>
      );
    }
  }

  getCourseToUpdate = () => {
    if (this.props.course === undefined) {
      return null;
    }
    const course = this.props.course;
    this.setState({
      courseId: course.id,
      title: course.title,
      subject: course.subject,
      category: course.category.id,
      creditPoints: course.credit_points,
      description: course.description
    });
  };

  componentDidMount() {
    console.log("[Course/Form.js] component did mount");
    getCategoryList(this.catSaveHandler);
    this.getCourseToUpdate();
    this.setState({ shouldOpen: this.props.open });
  }
}

export default CourseForm;
