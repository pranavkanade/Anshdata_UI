import React, { Component, createRef } from "react";
import {
  Container,
  Grid,
  Segment,
  Card,
  Image,
  Header,
  Menu,
  Dimmer,
  Loader,
  Button,
  Divider,
  Icon
} from "semantic-ui-react";
import { getUserDetails } from "../../../Requests/User";
import { getDraftedSelfCoursesList } from "../../../Requests/DraftCourses";
import {
  getEnrolledCoursesList,
  getPublishedCoursesList
} from "../../../Requests/Courses";
import { renderPublishedCoursesList as CoursesList } from "../../Generic/CourseList/courselist";
import { courseListType } from "../../../globals";
import Link from "next/link";

class Index extends Component {
  state = {
    user: null,
    activeItem: "Enrollments",
    enrolledCourses: null,
    publishedCourses: null,
    draftedCourses: null
  };
  contextRef = createRef();

  userSaveHandler = user => {
    this.setState({ user });
    console.log("user saved ", user);
  };

  enrolledCoursesSaveHandler = enrolledCourses => {
    this.setState({ enrolledCourses });
  };

  publishedCoursesSaveHandler = publishedCourses => {
    this.setState({ publishedCourses });
  };

  draftedCoursesSaveHandler = draftedCourses => {
    this.setState({ draftedCourses });
  };

  renderUserInfo = () => {
    return (
      <Card style={{ height: "40rem", width: "100%" }}>
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Header size="tiny">BIO</Header>
        </Card.Content>
        <Card.Content extra>
          <Header size="tiny">SKILLS</Header>
        </Card.Content>
        <Card.Content extra>
          <Header size="tiny">Experience</Header>
        </Card.Content>
        <Card.Content extra>
          <Header size="tiny">Badges</Header>
        </Card.Content>
        <Card.Content extra>
          <Header size="tiny">Reputation</Header>
        </Card.Content>
      </Card>
    );
  };

  handleItemClick = (e, { name }) => {
    if (name === "Published" && this.state.publishedCourses === null) {
      if (this.state.user === null) {
        return;
      }
      getPublishedCoursesList(
        this.state.user.id,
        this.publishedCoursesSaveHandler
      );
    } else if (name === "Drafts" && this.state.draftedCourses === null) {
      getDraftedSelfCoursesList(this.draftedCoursesSaveHandler);
    }
    this.setState({ activeItem: name });
  };

  renderSecMenu = () => {
    const { activeItem } = this.state;
    return (
      <>
        <Menu color="black" pointing secondary size="large" widths={5}>
          <Menu.Item
            name="Enrollments"
            active={activeItem === "Enrollments"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Published"
            active={activeItem === "Published"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Drafts"
            active={activeItem === "Drafts"}
            onClick={this.handleItemClick}
          />
          <Menu.Item />
          <Menu.Item />
        </Menu>
      </>
    );
  };

  renderLoader = () => {
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Segment basic>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  };

  renderCourses = (courses, listType, moreURL) => {
    if (courses === null) {
      return this.renderLoader();
    }
    return (
      <>
        <CoursesList
          courses={courses.slice(0, 6)}
          courseListType={listType}
          detailURL={"/courses"}
        />
        <Divider hidden />
        <Link href={moreURL}>
          <Button
            floated="right"
            size="big"
            color="twitter"
            fluid
            icon
            inverted>
            More <Divider vertical hidden /> <Divider vertical hidden />
            <Icon name="external alternate" />
          </Button>
        </Link>
      </>
    );
  };

  renderCourseContent = () => {
    const { activeItem } = this.state;

    if (activeItem === "Enrollments") {
      return this.renderCourses(
        this.state.enrolledCourses,
        courseListType.OVERVIEW,
        "/courses"
      );
    } else if (activeItem === "Published") {
      return this.renderCourses(
        this.state.publishedCourses,
        courseListType.OVERVIEW,
        "/contrib/pub"
      );
    } else if (activeItem === "Drafts") {
      return this.renderCourses(
        this.state.draftedCourses,
        courseListType.MODIFY,
        "/contrib"
      );
    }
  };

  render() {
    console.log("User/Index - enrolled Courses", this.state.enrolledCourses);
    return (
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column width="1" />
          <Grid.Column width="4">
            <div style={{ height: "5rem" }} />
            <div>{this.renderUserInfo()}</div>
          </Grid.Column>
          <Grid.Column width="10">
            <div style={{ height: "15rem" }} />
            <Segment basic>
              {this.renderSecMenu()}
              {this.renderCourseContent()}
            </Segment>
          </Grid.Column>
          <Grid.Column width="1" />
        </Grid.Row>
      </Grid>
    );
  }

  componentDidMount() {
    getUserDetails(this.props.user_name, this.userSaveHandler);
    getEnrolledCoursesList(this.enrolledCoursesSaveHandler);
  }
}

export default Index;
