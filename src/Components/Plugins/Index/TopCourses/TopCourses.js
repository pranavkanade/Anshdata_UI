import React, { useState } from "react";
import { connect } from "react-redux";
import css from "./TopCourses.scss";
import { renderTopCoursesList as CourseList } from "../../../Generic/CourseList/courselist";

const displayMore = (totalCrs, dispCount) => {
  const count = dispCount + 5;
  // this.setState({ crsCount: count });
  if (count <= totalCrs) {
    return count;
  } else {
    return totalCrs;
  }
};

const displayLess = dispCount => {
  const count = dispCount - 5;
  // this.setState({ crsCount: count });
  if (count >= 5) {
    return count;
  } else {
    return 5;
  }
};

const renderCourseList = (topCourses, dispCount) => {
  if (topCourses === null || topCourses === undefined) {
    return null;
  }
  const courses = topCourses.slice(0, dispCount);
  return (
    <div className={css.categoryCarousel}>
      <CourseList courses={courses} />
    </div>
  );
};

const popularCourses = props => {
  const { topCourses } = props;
  if (topCourses === null) {
    return null;
  }
  const [dispCount, setDispCount] = useState(5);
  return (
    <div className={css.container}>
      <span className={css.title}>Top Courses</span>
      {renderCourseList(topCourses, dispCount)}
      <div className={css.actions}>
        <button
          className={css.more}
          onClick={() =>
            setDispCount(displayMore(topCourses.length, dispCount))
          }>
          <img src="/static/assets/icon/add_24px_outlined.svg" />
        </button>
        <button
          className={css.less}
          onClick={() => setDispCount(displayLess(dispCount))}>
          <img src="/static/assets/icon/remove_24px_outlined.svg" />
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { topCourses } = state.crs;
  return { topCourses };
}

export default connect(mapStateToProps)(popularCourses);
