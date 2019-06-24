import React from "react";

import css from "./ModuleCard.scss";
import LessonCard from "./LessonCard";

const renderLoader = () => {
  return (
    <div className={css.loader}>
      <div className={"ui active inverted centered inline loader massive"} />;
    </div>
  );
};

const renderAction = () => {
  return (
    <div className={css.actionBar}>
      <button>
        <span className={css.label}>Start</span>
        <img src="../../../../static/assets/icon/arrow_forward_24px_outlined.svg" />
      </button>
    </div>
  );
};

const renderStats = (lessons = 2, creditPoints = 10, assignments = 3) => {
  return (
    <div className={css.secBox}>
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
    <div className={css.mdModuleCard} onClick={() => props.select(module.id)}>
      <h3 className={css.title}>{module.title}</h3>
      {renderAction()}
      {renderStats(
        module.lessons.length,
        getCreditPoints(module.assignments),
        module.assignments.length
      )}
    </div>
  );
};

const renderEditActionBar = () => {
  return (
    <div className={css.actionBar}>
      <button className={css.delete}>
        <span className={css.label}>Delete</span>
        <img src="../../../../static/assets/icon/delete_sweep_24px_outlined.svg" />
      </button>
      <button className={css.edit}>
        <span className={css.label}>Modify</span>
        <img src="../../../../static/assets/icon/create_24px_outlined.svg" />
      </button>
    </div>
  );
};

export const ModuleCardDraft = props => {
  const module = props.module;
  console.log("Module Card = ", module);

  if (module === null || module.lessons === undefined) {
    return <div className={css.mdModuleCard}>{renderLoader()}</div>;
  }

  return (
    <div className={css.mdModuleCard} onClick={() => props.select(module.id)}>
      <h3 className={css.title}>{module.title}</h3>
      <p>{module.description}</p>
      {renderStats(
        module.lessons.length,
        getCreditPoints(module.assignments),
        module.assignments.length
      )}
      {renderEditActionBar()}
    </div>
  );
};

const renderLessonsList = lessons => {
  return lessons.map(lsn => {
    return <LessonCard lesson={lsn} id={lsn.id} />;
  });
};

export const DetailedModuleCard = props => {
  const module = props.module;
  console.log("Detailed Module Card = ", module);

  if (module === null || module.lessons === undefined) {
    return <div className={css.detailedModuleCard}>{renderLoader()}</div>;
  }

  return (
    <div className={css.detailedModuleCard}>
      <div className={css.head}>
        <span>{module.title} : Lessons</span>
        <button className={css.arrows} onClick={props.close}>
          <img src="../../../../static/assets/icon/clear_24px_outlined.svg" />
        </button>
      </div>

      <div className={css.lessonsBox}>
        <button className={css.arrows}>
          <img src="../../../../static/assets/icon/arrow_back_ios_24px_outlined.svg" />
        </button>
        <div className={css.lessonsList}>
          {renderLessonsList(module.lessons)}
        </div>
        <button className={css.arrows}>
          <img src="../../../../static/assets/icon/arrow_forward_ios_24px_outlined.svg" />
        </button>
      </div>
    </div>
  );
};
