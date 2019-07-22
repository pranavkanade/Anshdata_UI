import React, { Component } from "react";
import Link from "next/link";

import css from "./contribute.scss";

import SearchBar from "../../Generic/Searchbar/searchbar";
import { renderDraftCoursesList as CourseList } from "../../Generic/CourseList/courselist";

import {
  getDraftedCommunityCoursesList,
  getDraftedSelfCoursesList
} from "../../../Requests/DraftCourses";
import { getPublishedCoursesList } from "../../../Requests/Courses";
import { getADUser } from "../../../Requests/Authorization";

class Contribute extends Component {
  state = {
    courseSearched: "",
    activeSubMenu: "",
    myPublication: null,
    myDrafts: null,
    communityDrafts: null,
    adUser: null,
    selectedCourseId: 0
  };

  setSelectedCourseIdHandler = id => {
    if (id === this.state.selectedCourseId) {
      this.setState({ selectedCourseId: 0 });
    } else {
      this.setState({ selectedCourseId: id });
    }
  };

  closeSelectedCourse = () => {
    this.setState({ selectedCourseId: 0 });
  };

  myPublicationSaveHandler = courses => {
    this.setState({ myPublication: courses });
  };

  myDraftsSaveHandler = courses => {
    this.setState({ myDrafts: courses });
  };

  communityDraftsSaveHandler = courses => {
    this.setState({ communityDrafts: courses });
  };

  setSearchedCourseHandler = courseName => {
    this.setState({ courseSearched: courseName });
  };

  subMenuChangeHandler = selectedSubMenu => {
    this.setState({ activeSubMenu: selectedSubMenu });
  };

  setDefaultSubMenu = adUser => {
    if (
      adUser === null ||
      adUser === undefined ||
      adUser.id === null ||
      adUser.id === undefined
    ) {
      this.setState({ activeSubMenu: "communityDrafts" });
    } else {
      this.setState({ activeSubMenu: "publication" });
    }
  };

  renderLoader = () => {
    return (
      <div className={css.loader}>
        <div className={"ui active centered inline loader massive"} />
      </div>
    );
  };

  renderCourseShowcase = () => {
    let coursesToShowcase = null;
    if (this.state.activeSubMenu === "publication") {
      coursesToShowcase = this.state.myPublication;
    } else if (this.state.activeSubMenu === "drafts") {
      coursesToShowcase = this.state.myDrafts;
    } else if (this.state.activeSubMenu === "communityDrafts") {
      coursesToShowcase = this.state.communityDrafts;
    }

    if (coursesToShowcase === null) {
      return this.renderLoader();
    }

    return (
      <CourseList
        courses={coursesToShowcase}
        selectedCourse={this.state.selectedCourseId}
        setSelectedCourse={this.setSelectedCourseIdHandler}
        closeSelectedCourse={this.closeSelectedCourse}
        activeTab={this.state.activeSubMenu}
      />
    );
  };

  renderSubMenu = () => {
    return (
      <div className={css.subMenu}>
        <button
          name="publication"
          className={
            this.state.activeSubMenu === "publication" ? css.activeMenu : ""
          }
          onClick={event => this.subMenuChangeHandler(event.target.name)}>
          Publications
        </button>
        <button
          name="drafts"
          className={
            this.state.activeSubMenu === "drafts" ? css.activeMenu : ""
          }
          onClick={event => this.subMenuChangeHandler(event.target.name)}>
          Drafts
        </button>
        <button
          name="communityDrafts"
          className={
            this.state.activeSubMenu === "communityDrafts"
              ? css.activeMenu
              : ""
          }
          onClick={event => this.subMenuChangeHandler(event.target.name)}>
          Community Drafts
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className={css.contributePage}>
        {/*<SearchBar
          placeholder="Course Name"
          searchedValue={this.state.courseSearched}
          changeHandler={this.setSearchedCourseHandler}
          searchHandler={this.onSearched}
        />*/}
        <div className={css.actionBar}>
          {this.renderSubMenu()}
          <Link href="/contribute/course">
            <button className={css.creation}>
              <span>Create New Course</span>
              <img src="../../../../static/assets/icon/add_24px_outlined.svg" />
            </button>
          </Link>
        </div>
        <hr />
        <div className={css.showcase}>{this.renderCourseShowcase()}</div>
      </div>
    );
  }

  componentDidMount() {
    const adUser = getADUser();
    this.setState({ adUser });
    this.setDefaultSubMenu(adUser);
    try {
      getPublishedCoursesList(adUser.user.pk, this.myPublicationSaveHandler);
      getDraftedSelfCoursesList(this.myDraftsSaveHandler);
    } catch (err) {}
    getDraftedCommunityCoursesList(this.communityDraftsSaveHandler);
  }
}

export default Contribute;
