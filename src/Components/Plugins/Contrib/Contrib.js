import React, { Component } from "react";
import Link from "next/link";
import {
  Container,
  Grid,
  Button,
  Card,
  Label,
  Menu,
  Header,
  Divider
} from "semantic-ui-react";
import CoursesList from "../../Generic/Assets/CoursesList";
import { courseListType } from "../../../globals";
import {
  getDraftedCommunityCoursesList,
  getDraftedSelfCoursesList
} from "../../../Requests/DraftCourses";

const menuTypes = {
  COMMUNITY: "Community",
  SELF: "Self"
};

class Contrib extends Component {
  state = {
    activeMenu: menuTypes.SELF,
    courses: [],
    commCourses: [],
    selfCourses: []
  };

  saveCommCourses = courses => {
    this.setState({ commCourses: courses });
  };

  saveSelfCourses = courses => {
    this.setState({ selfCourses: courses });
  };

  renderCourseList = () => {
    const { activeMenu } = this.state;
    let courses = [];
    if (activeMenu === menuTypes.SELF) {
      courses = this.state.selfCourses;
    } else {
      courses = this.state.commCourses;
    }
    return (
      <Card.Group itemsPerRow={3}>
        <CoursesList
          courses={courses}
          courseListType={courseListType.MODIFY}
          detailURL={"/contrib/course"}
        />
      </Card.Group>
    );
  };

  renderSecMenu = () => {
    const { activeMenu } = this.state;
    return (
      <Menu size="large" pointing secondary widths={3} fluid color="violet">
        <Menu.Item
          name={menuTypes.SELF}
          active={activeMenu === menuTypes.SELF}
          onClick={() => {
            this.setState({ activeMenu: menuTypes.SELF });
          }}
        />
        <Menu.Item
          name={menuTypes.COMMUNITY}
          active={activeMenu === menuTypes.COMMUNITY}
          onClick={() => {
            this.setState({ activeMenu: menuTypes.COMMUNITY });
          }}
        />
        <Menu.Item disabled />
      </Menu>
    );
  };

  // TODO: Add a tab of all the courses that are pending for the review
  // A tab for courses that are ready to publish
  render() {
    console.log("[Contrib.js] render");
    return (
      <Container as="div" className={"ContributePlugin"}>
        <Divider hidden />
        <Divider hidden />
        <Link href="/contrib/course">
          <Button inverted color="twitter" size="big" floated="right">
            Add New Course
          </Button>
        </Link>
        <Divider hidden />
        <Header size="large">List of drafted courses</Header>
        {this.renderSecMenu()}
        {this.renderCourseList()}
      </Container>
    );
  }

  componentDidMount() {
    console.log("[Contrib.js] component did mount");
    console.log("State: ", this.state);
    // this.getDraftedCoursesList();
    getDraftedCommunityCoursesList(this.saveCommCourses);
    getDraftedSelfCoursesList(this.saveSelfCourses);
  }

  componentWillUnmount() {
    console.log("[Contrib.js] component will unmount");
  }

  shouldComponentUpdate() {
    console.log("[Contrib.js] should component Update");
    return true;
  }

  componentDidUpdate() {
    console.log("[Contrib.js] component did update");
    console.log("State: ", this.state);
  }
}

export default Contrib;
