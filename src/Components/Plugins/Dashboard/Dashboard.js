/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Sidebar, Icon, Header, Container } from "semantic-ui-react";

import Gcard from "../../Generic/Card";

import StyleClasses from "./Dashboard.scss";

class DashboardPlugin extends Component {
  state = {
    sidebarVisible: false,
    currentView: "Overview",
    overViewStat: [
      {
        label: "Overview",
        count: 1389
      },
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
      <div className="row">
        {this.state.overViewStat.map((s, i) => {
          return <Gcard title={s.label} content={s.count} />;
        })}
      </div>
    );
  };

  renderOverviewGraphsSegment = () => {
    return (
      <div class={"card " + StyleClasses.second} as="div">
        <div class="card-title">
          <Icon name="bar chart" />
          Project each of the above cards across the user's timeline.
        </div>
      </div>
    );
  };

  renderExtaStatsSegment = () => {
    return (
      <div className={"card " + StyleClasses.third}>
        <span className="card-title">
          More stats about the property selected above
        </span>
      </div>
    );
  };

  renderTrends = () => {
    const trends = [
      {
        color: "blue darken-2",
        title: "React: The complete Guide",
        textColor: "grey-text text-lighten-5"
      },
      {
        color: "grey darken-4",
        title: "Next.js: Zero to Hero",
        textColor: "grey-text text-lighten-5"
      },
      {
        color: "light-green lighten-2",
        title: "Machine Learning: Stanford University"
      },
      {
        color: "red lighten-3",
        title: "UI/UX: Beginner"
      }
    ];
    return (
      <div class="row center-align">
        {trends.map((m, i) => {
          return (
            <div className="col s3">
              <div
                className={
                  "card z-depth-5 " + m.color + " " + StyleClasses.trend
                }>
                <h2 className={"card-title " + m.textColor}>{m.title}</h2>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderTrendsSegment = () => {
    return (
      <div className={"card " + StyleClasses.fourth}>
        <span className="card-title">
          Display all the current trends on the platform
        </span>
        {this.renderTrends()}
      </div>
    );
  };

  renderOverview = () => {
    return (
      <>
        <h4>This is Overview</h4>
        {this.renderOverViewStats()}
        {this.renderOverviewGraphsSegment()}
        {this.renderExtaStatsSegment()}
        {this.renderTrendsSegment()}
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
      <div className={StyleClasses.banner}>
        <i
          className="material-icons medium"
          onClick={this.showSidebarHandler}
          style={{ fontSize: "35px" }}>
          menu
        </i>
        {content}
      </div>
    );
  };

  renderSidebar = () => {
    const menuItems = [
      {
        name: "Overview",
        icon: "graphic_eq"
      },
      {
        name: "Courses",
        icon: "featured_play_list"
      },
      {
        name: "Forum",
        icon: "forum"
      },
      {
        name: "Blog",
        icon: "format_align_left"
      }
    ];
    return (
      <Sidebar
        className={StyleClasses.sidebar}
        as="aside"
        animation="push"
        visible={this.state.sidebarVisible}>
        <ul className={"sidenav sidenav-fixed " + StyleClasses.sidebarMenu}>
          {menuItems.map((m, i) => {
            return (
              <li key={i} onClick={() => this.viewChangeHandler(m.name)}>
                <a>
                  <i className="material-icons">{m.icon}</i>
                  <span>{m.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </Sidebar>
    );
  };

  render() {
    return (
      <Container fluid className={StyleClasses.dashboard}>
        <Sidebar.Pushable as="div">
          {this.renderSidebar()}
          <Sidebar.Pusher>{this.renderPusherContent()}</Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}

export default DashboardPlugin;
