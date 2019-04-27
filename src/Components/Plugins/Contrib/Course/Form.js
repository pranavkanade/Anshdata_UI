import React, { Component } from "react";
import {
  Container,
  Grid,
  Form,
  Dropdown,
  Divider,
  Segment,
  Header
} from "semantic-ui-react";
import Router from "next/router";

const URLS = {
  CREATE_COURSE: "http://127.0.0.1:8000/api/course/",
  LIST_CATS: "http://127.0.0.1:8000/api/plat/cat/"
};

class CourseContributionForm extends Component {
  state = {
    title: "",
    subject: "",
    category: "",
    isPublished: false,
    creditPoints: 0,
    description: ""
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
    // console.log("[Course/Form.js] onChangeHandler");
    // console.log(name, value);
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
      credit_points: String(this.state.creditPoints),
      description: this.state.description
    };
  };

  createCourse = async () => {
    console.log("[Course/Form.js] Create Course clicked");
    try {
      const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
        "token"
      ];
      const courseData = this.getNewCourseData();
      const createCourseRes = await fetch(URLS.CREATE_COURSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${AnshdataToken}`
        },
        body: JSON.stringify(courseData)
      });
      let newCourse = await createCourseRes.json();
      console.log("Newly Created Course", newCourse);
      this.props.onSaveHandler(newCourse);
      // Router.push("/contrib/course");
    } catch (err) {
      console.log("[Course/Form.js] user is not logged in : ", err);
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
        <Header size="tiny">Category</Header>
        <Dropdown
          placeholder="Select Category"
          clearable
          fluid
          options={catOptions}
          selection
          onChange={this.categorySelectionHandler}
        />
      </>
    );
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

  renderForm = () => {
    // TODO: Add button to send it for review
    // TODO: Add a muted button to publish the courses
    return (
      <>
        <Segment basic>
          <Form onSubmit={this.createCourse}>
            <Header size="tiny">Course Title</Header>
            <Form.Input
              placeholder="Zero to 'HERO' !!"
              value={this.state.title}
              name="title"
              size="large"
              onChange={event => this.changeHandler(event)}
            />
            <Header size="tiny">Subject</Header>
            <Form.Input
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
            <Header size="tiny">Course Description</Header>
            <Form.TextArea
              placeholder="Describe your course in short..."
              value={this.state.description}
              name="description"
              onChange={event => this.changeHandler(event)}
            />
            <Divider hidden />
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column />
                <Grid.Column>
                  <Form.Button type="submit" color="twitter" fluid size="big">
                    Save
                  </Form.Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </>
    );
  };

  render() {
    return (
      <>
        <Header dividing size="huge">
          Create New Course
        </Header>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width="1" />
            <Grid.Column width="13">{this.renderForm()}</Grid.Column>
            <Grid.Column width="2" />
          </Grid.Row>
        </Grid>
      </>
    );
  }

  // The component management functions
  getCategoryList = async () => {
    console.log("[Course/Form.js] get categories");
    try {
      const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
        "token"
      ];
      await fetch(URLS.LIST_CATS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${AnshdataToken}`
        }
      })
        .then(response => response.json())
        .then(data => this.setState({ catList: data }));
    } catch (err) {
      console.log("[Course/Form.js] user is not logged in : ", err);
      return [];
    }
  };

  componentDidMount() {
    console.log("[Course/Form.js] component did mount");
    this.getCategoryList();
  }
}

export default CourseContributionForm;
