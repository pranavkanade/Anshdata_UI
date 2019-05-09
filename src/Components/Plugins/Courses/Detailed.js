import React, { Component } from "react";
import { getCourse } from "./requests";
import Course from "../Contrib/Course/Render";
import Module from "../Contrib/Module/Render";
import Lesson from "../Contrib/Lesson/Render";
import Assignment from "../Contrib/Assignment/Render";
import { Container, Divider, Grid, Accordion, Menu } from "semantic-ui-react";

const menuTypes = {
  DETAIL: "Detailed",
  ASSIGNMENT: "Assignments"
};

const viewTypes = {
  MODIFY: "mod",
  DETAIL: "detail"
};

class DetailedCourse extends Component {
  state = {
    course: null,
    activeModule: -1,
    activeMenu: menuTypes.DETAIL,
    newEle: this.props.newEleId
  };

  courseSaveHandler = course => {
    console.log("[Detailed.js] saving course");
    this.setState({ course });
    this.props.setCourse(course);
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

  renderAssignments = (assignments, viewType, moduleOnly = false) => {
    if (assignments === null) {
      return null;
    }

    return assignments.map(assign => {
      if (moduleOnly && assign.lesson !== null) {
        return null;
      }
      return (
        <Assignment
          assignment={assign}
          type={viewType}
          key={assign.id}
          addHandler={this.props.addHandler}
        />
      );
    });
  };

  renderLessons = (lessons, viewType) => {
    if (lessons === null) {
      return null;
    }

    return lessons.map(lsn => {
      return (
        <>
          <Lesson
            lesson={lsn}
            type={viewType}
            key={lsn.id}
            addHandler={this.props.addHandler}
          />
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={2} />
              <Grid.Column width={14}>
                {this.renderAssignments(lsn.assignments, viewType, false)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      );
    });
  };

  renderModules = viewType => {
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
              type={viewType}
              isExpanded={mod.id === this.state.activeModule}
              addHandler={this.props.addHandler}
            />
          </Accordion.Title>
          {/*
          TODO: Edit this to put the rendered lessons and Assignments here
         */}
          <Accordion.Content active={mod.id === this.state.activeModule}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={2} />
                <Grid.Column width={14}>
                  {this.renderLessons(mod.lessons, viewType)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={1} />
                <Grid.Column width={15}>
                  {this.renderAssignments(mod.assignments, viewType, true)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <br />
          </Accordion.Content>
        </Accordion>
      );
    });
  };

  renderSecondaryMenu = () => {
    const { activeMenu } = this.state;
    return (
      <div>
        <Menu size="large" pointing secondary widths={3} fluid color="violet">
          <Menu.Item
            name={menuTypes.DETAIL}
            active={activeMenu === menuTypes.DETAIL}
            onClick={() => {
              this.setState({ activeMenu: menuTypes.DETAIL });
            }}
          />
          <Menu.Item
            name={menuTypes.ASSIGNMENT}
            active={activeMenu === menuTypes.ASSIGNMENT}
            onClick={() => {
              this.setState({ activeMenu: menuTypes.ASSIGNMENT });
            }}
          />
          <Menu.Item disabled />
        </Menu>
      </div>
    );
  };

  render() {
    const viewType =
      this.props.viewType !== viewTypes.MODIFY
        ? viewTypes.DETAIL
        : this.props.viewType;
    return (
      <Container>
        <br />
        {this.state.course !== null ? (
          <Course course={this.state.course} type={viewType} />
        ) : null}

        <Divider />

        {this.renderSecondaryMenu()}
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={1} />
            <Grid.Column width={14}>
              <br />
              {this.state.activeMenu === menuTypes.DETAIL
                ? this.renderModules(viewType)
                : this.renderAssignments(
                    this.state.course.assignments,
                    viewType
                  )}
            </Grid.Column>
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
