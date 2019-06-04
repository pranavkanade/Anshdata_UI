import React, { Component } from "react";
import { getCourse } from "./requests";
import Course from "../Contrib/Course/Render";
import Module from "../Contrib/Module/Render";
import Lesson from "../Contrib/Lesson/Render";
import Assignment from "../Contrib/Assignment/Render";
import { Modal, Divider, Grid, Accordion, Menu } from "semantic-ui-react";

import { getIfEnrolled } from "../../../Requests/Enrollment";
import css from "./detailed.scss";

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
    newEle: this.props.newEleId,
    isEnrolledIn: false
  };

  ifEnrolledSaveHandler = data => {
    if (data !== undefined) {
      this.setState({ isEnrolledIn: true });
    }
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

  renderAllAssignments = viewType => {
    return (
      <div className={css.listAssignBox}>
        {this.renderAssignments(this.state.course.assignments, viewType)}
      </div>
    );
  };

  renderLessons = (lessons, viewType) => {
    if (lessons === null) {
      return null;
    }

    return lessons.map(lsn => {
      return (
        <div key={lsn.id} className={css.item}>
          <Lesson
            lesson={lsn}
            type={viewType}
            addHandler={this.props.addHandler}
          />
          <div>{this.renderAssignments(lsn.assignments, viewType, false)}</div>
        </div>
      );
    });
  };

  renderLessonList = (mod, viewType) => {
    return (
      <div className={css.detailedModBox}>
        <div>
          <span className={css.heading}>{mod.title}</span>
          <Divider hidden />
          <span className={css.desc}>{mod.description}</span>
        </div>
        <div className={css.lessons}>
          {this.renderLessons(mod.lessons, viewType)}
        </div>
        <Divider />
        <div>{this.renderAssignments(mod.assignments, viewType, true)}</div>
      </div>
    );
  };

  renderModules = viewType => {
    if (this.state.course === null) {
      return null;
    }

    return (
      <div className={css.listModBox}>
        {this.state.course.modules.map(mod => {
          return (
            <>
              <div className={css.modBox} key={mod.id}>
                <div
                  onClick={() => {
                    this.moduleExpansionHandler(mod.id);
                  }}>
                  <Module
                    module={mod}
                    type={viewType}
                    isExpanded={mod.id === this.state.activeModule}
                    addHandler={this.props.addHandler}
                  />
                </div>
              </div>
              {mod.id === this.state.activeModule
                ? this.renderLessonList(mod, viewType)
                : null}
            </>
          );
        })}
      </div>
    );
  };

  renderSecondaryMenu = () => {
    const { activeMenu } = this.state;
    return (
      <div className={css.secMenu}>
        <Menu secondary>
          <Menu.Item
            active={activeMenu === menuTypes.DETAIL}
            onClick={() => {
              this.setState({ activeMenu: menuTypes.DETAIL });
            }}>
            <text>{menuTypes.DETAIL}</text>
          </Menu.Item>
          <Menu.Item
            active={activeMenu === menuTypes.ASSIGNMENT}
            onClick={() => {
              this.setState({ activeMenu: menuTypes.ASSIGNMENT });
            }}>
            <text>{menuTypes.ASSIGNMENT}</text>
          </Menu.Item>
        </Menu>
        <Divider />
      </div>
    );
  };

  render() {
    const viewType =
      this.props.viewType !== viewTypes.MODIFY
        ? viewTypes.DETAIL
        : this.props.viewType;
    return (
      <div className={css.detailed}>
        <br />
        {this.state.course !== null ? (
          <Course
            course={this.state.course}
            isEnrolled={this.state.isEnrolledIn}
            type={viewType}
            addHandler={this.props.addHandler}
          />
        ) : null}
        <Divider hidden />
        {this.renderSecondaryMenu()}
        <div className={css.secondaryBox}>
          {this.state.activeMenu === menuTypes.DETAIL
            ? this.renderModules(viewType)
            : this.renderAllAssignments(viewType)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    getCourse(this.props.courseId, this.courseSaveHandler);
    getIfEnrolled(this.props.courseId, this.ifEnrolledSaveHandler);
  }
}

export default DetailedCourse;

// TODO: Show course level assignments
