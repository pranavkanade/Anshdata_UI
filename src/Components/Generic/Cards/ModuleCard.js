import React from "react";

import css from "./ModuleCard.scss";

const renderLoader = () => {
  return (
    <div className={css.loader}>
      <div className={"ui active inverted centered inline loader massive"} />;
    </div>
  );
};

const renderStats = (lessons = 2, creditPoints = 10, assignments = 3) => {
  return (
    <div className={css.secBox}>
      <button>
        <span className={css.label}>Start</span>
        <img src="../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
      </button>
      <div className={css.stat}>
        <span className={css.value}>{lessons}</span>
        <br />
        <span className={css.label}>Lessons</span>
      </div>
      <div className={css.stat}>
        <span className={css.value}>{assignments}</span>
        <br />
        <span className={css.label}>Assignments</span>
      </div>
      <div className={css.stat}>
        <span className={css.value}>{creditPoints}</span>
        <br />
        <span className={css.label}>Credit Points</span>
      </div>
    </div>
  );
};

const getCreditPoints = assignments => {
  return assignments.reduce((sum, assignment) => {
    return sum + assignment.credit_points;
  }, 0);
};

export const ModuleCardMd = props => {
  const module = props.module;
  console.log("Module Card = ", module);

  if (module === null || module.lessons === undefined) {
    return <div className={css.mdModuleCard}>{renderLoader()}</div>;
  }

  return (
    <div className={css.mdModuleCard}>
      <span>{module.title}</span>
      {renderStats(
        module.lessons.length,
        getCreditPoints(module.assignments),
        module.assignments.length
      )}
    </div>
  );
};
