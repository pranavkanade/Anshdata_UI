import React, { Component } from "react";
import Link from "next/link";

import css from "./draftcard.scss";

import { getCourse } from "../../../../Requests/Courses";
import { cardType } from "../../../../globals";

const renderHead = (id, title, closeHandler, activeTab) => {
  console.log("[draft card ] active tab ", activeTab);
  return (
    <div className={css.head}>
      <Link
        href={
          activeTab === "drafts" ? `/contribute/draft/${id}` : `/courses/${id}`
        }>
        <span>{title}</span>
      </Link>
      <button className={css.arrows} onClick={closeHandler}>
        <img src="../../../../static/assets/icon/clear_24px_outlined.svg" />
      </button>
    </div>
  );
};

const renderStat = (stat, i) => {
  return (
    <div className={css.stat} key={i}>
      <span className={css.value}>{stat.value}</span>
      <br />
      <span className={css.label}>{stat.label}</span>
    </div>
  );
};

const renderStats = (cardType, course, reviews = 1) => {
  const common = [
    {
      label: "Credit Points",
      value: course.credit_points
    },
    {
      label: "Assignments",
      value: course.assignments.length
    },
    {
      label: "Author",
      value: course.author.username
    },
    {
      label: "Category",
      value: course.category.title
    }
  ];
  const statsCollection = [
    {
      label: "Reviews",
      value: `${reviews}/3`
    },
    ...common
  ];

  return (
    <div className={css.statsBox}>
      {statsCollection.map((stat, i) => {
        return renderStat(stat, i);
      })}
    </div>
  );
};

const renderTags = course => {
  return <div className={css.tagBox} />;
};

const renderSecondaryInfo = (cardType, course) => {
  return (
    <>
      {renderStats(cardType, course)}
      {renderTags()}
    </>
  );
};

const renderActionBar = props => {
  if (props.activeTab === "communityDrafts") {
    return null;
  }
  return (
    <div className={css.actionBar}>
      <button className={css.publish}>
        <span>Publish</span>
        <img src="./../../../../../static/assets/icon/upload_24px_outlined.svg" />
      </button>
      <button className={css.review}>
        <span>Send for Review</span>
        <img src="./../../../../../static/assets/icon/done_all_24px_outlined.svg" />
      </button>
      <button className={css.delete}>
        <span>Delete</span>
        <img src="./../../../../../static/assets/icon/delete_sweep_24px_outlined.svg" />
      </button>
      <Link href={`/contribute/draft/${props.course.id}`}>
        <button className={css.modify}>
          <span>Modify</span>
          <img src="./../../../../../static/assets/icon/create_24px_outlined.svg" />
        </button>
      </Link>
    </div>
  );
};

class LgDrafedCourseCard extends Component {
  state = {
    course: null
  };

  renderLoader = () => {
    return (
      <div className={css.loader}>
        <div className={"ui inverted active centered inline loader massive"} />
      </div>
    );
  };

  render() {
    const course = this.state.course;
    console.log("active tab : ", this.props.activeTab);
    if (course === null) {
      return (
        <div className={css.draftedCourseCardLg}>{this.renderLoader()}</div>
      );
    }
    return (
      <div className={css.draftedCourseCardLg}>
        {renderHead(
          course.id,
          course.title,
          this.props.closeSelectedCourse,
          this.props.activeTab
        )}
        <div className={css.description}>
          <p>{this.state.course.description}</p>
        </div>
        {renderSecondaryInfo(cardType.DRAFT, this.state.course)}
        {renderActionBar(this.props)}
      </div>
    );
  }

  courseSaveHandler = course => {
    this.setState({ course });
  };

  componentDidMount() {
    getCourse(this.props.course.id, this.courseSaveHandler);
  }
}

export default LgDrafedCourseCard;
