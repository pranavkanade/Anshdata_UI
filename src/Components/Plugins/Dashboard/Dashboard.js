import React, { useState, Component } from "react";
import {
  Sidebar,
  Grid,
  Menu,
  Segment,
  Icon,
  Header,
  Container,
  Image,
  Card,
  Button
} from "semantic-ui-react";

import StyleClasses from "./Dashboard.scss";

class DashboardPlugin extends Component {
  state = {
    sidebarVisible: false,
    currentView: "Overview",
    overViewStat: [
      {
        label: "New Students",
        count: 203
      },
      {
        label: "Engagements",
        count: 999
      },
      {
        label: "Views",
        count: 300
      },
      {
        label: "Likes",
        count: 130
      },
      {
        label: "Reviews",
        count: 50
      }
    ]
  };

  viewChangeHandler = view => {
    this.setState({ currentView: view });
  };

  showSidebarHandler = () => {
    const sidebarVisible = this.state.sidebarVisible;
    this.setState({ sidebarVisible: !sidebarVisible });
  };

  renderOverViewStats = () => {
    return (
      <Card.Group as="div" className={StyleClasses.overviewCardGroup}>
        {this.state.overViewStat.map((s, i) => {
          return (
            <div className={StyleClasses.overviewCard}>
              <Card raised as="div" fluid>
                <Card.Content extra>{s.label}</Card.Content>
                <Card.Content header={s.count} centered />
              </Card>
            </div>
          );
        })}
      </Card.Group>
    );
  };

  renderOverview = () => {
    return (
      <>
        <Header as="h3">This is Overview</Header>
        {this.renderOverViewStats()}
        <Segment as="div" placeholder>
          <Header icon>
            <Icon name="bar chart" />
            Project each of the above cards across the users timeline.
          </Header>
        </Segment>
      </>
    );
  };

  renderCourses = () => {
    return <Header as="h3">This is Courses</Header>;
  };

  renderForum = () => {
    return <Header as="h3">This is Forum</Header>;
  };

  renderBlog = () => {
    return <Header as="h3">This is Blog</Header>;
  };

  renderPusherContent = () => {
    let content = null;
    switch (this.state.currentView) {
      case "Overview":
        content = this.renderOverview();
        break;
      case "Courses":
        content = this.renderCourses();
        break;
      case "Blog":
        content = this.renderBlog();
        break;
      case "Forum":
        content = this.renderForum();
        break;
      default:
        break;
    }
    return (
      <Segment basic as="div" size="massive">
        <Icon name="list" onClick={this.showSidebarHandler} />
        {content}
      </Segment>
    );
  };

  renderSidebar = () => {
    const menuItems = [
      {
        name: "Overview",
        icon: "chart line"
      },
      {
        name: "Courses",
        icon: "home"
      },
      {
        name: "Forum",
        icon: "comments"
      },
      {
        name: "Blog",
        icon: "pencil alternate"
      }
    ];
    return (
      <Sidebar
        className={StyleClasses.sidebar}
        as="div"
        animation="push"
        visible={this.state.sidebarVisible}>
        <Menu vertical icon="labeled" borderless secondary>
          {menuItems.map((m, i) => {
            return (
              <Menu.Item
                as="div"
                key={i}
                className={StyleClasses.sidebarMenu}
                onClick={() => this.viewChangeHandler(m.name)}>
                <a>
                  <Icon name={m.icon} inverted size="large" />

                  {m.name}
                </a>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sidebar>
    );
  };

  render() {
    return (
      <Container fluid className={StyleClasses.dashboard}>
        <div className={StyleClasses.second}>
          <Sidebar.Pushable as="div" className={StyleClasses.pushable}>
            {this.renderSidebar()}
            <Sidebar.Pusher>{this.renderPusherContent()}</Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </Container>
    );
  }
}

export default DashboardPlugin;
