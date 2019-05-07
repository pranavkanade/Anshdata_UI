import React, { Component } from "react";
import { getCourse } from "./requests";
import Course from "../Contrib/Course/Render";
import Module from "../Contrib/Module/Render";
import {
  Container,
  Divider,
  Grid,
  Accordion,
  Segment
} from "semantic-ui-react";

class DetailedCourse extends Component {
  state = {
    course: null,
    activeModule: -1
  };

  courseSaveHandler = course => {
    console.log("[Detailed.js] saving course");
    this.setState({ course });
  };

  moduleExpansionHandler = modId => {
    if (modId === this.state.activeModule) {
      // NOTE: In case when use clicks on expanded module
      // we need to close it
      console.log("Closing module: ", modId);
      this.setState({ activeModule: -1 });
    } else {
      console.log("Module to expand: ", modId);
      this.setState({ activeModule: modId });
    }
  };

  renderModules = () => {
    if (this.state.course === null) {
      return null;
    }

    return this.state.course.modules.map(mod => {
      return (
        <Accordion key={mod.id}>
          <Accordion.Title
            active={mod.id === this.state.activeModule}
            onClick={() => {
              this.moduleExpansionHandler(mod.id);
            }}>
            <Module
              module={mod}
              type="detail"
              isExpanded={mod.id === this.state.activeModule}
            />
          </Accordion.Title>
          {/*
          TODO: Edit this to put the rendered lessons and Assignments here
         */}
          <Accordion.Content active={mod.id === this.state.activeModule}>
            <Segment>{"SizeForm"}</Segment>
          </Accordion.Content>
        </Accordion>
      );
    });
  };

  render() {
    return (
      <Container>
        <br />
        {this.state.course !== null ? (
          <Course course={this.state.course} />
        ) : null}

        <Divider />
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={2} />
            <Grid.Column width={13}>{this.renderModules()}</Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];

    getCourse(this.props.courseId, this.courseSaveHandler);
  }
}

export default DetailedCourse;
