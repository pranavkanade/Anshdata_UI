import React, { useState } from "react";

import css from "./Base.scss";

const renderLoader = () => {
  return (
    <div className={css.loader}>
      <div className={"ui active inverted centered inline loader massive"} />;
    </div>
  );
};

const renderLessons = (lessons, lessonSelectionHandler) => {
  return lessons.map(lsn => {
    return (
      <span
        className={css.lsn}
        key={lsn.id}
        onClick={() => lessonSelectionHandler(lsn.id, lsn.module)}>
        {lsn.title}
      </span>
    );
  });
};

const renderCourseContent = (
  course,
  lessonSelectionHandler,
  openMod,
  setOpenMod
) => {
  const Modules = course.modules.map(mod => {
    return (
      <div className={css.module} key={mod.id}>
        <span
          className={css.card}
          onClick={() => {
            mod.id === openMod ? setOpenMod(0) : setOpenMod(mod.id);
          }}>
          {mod.title}
        </span>
        {mod.id === openMod
          ? renderLessons(mod.lessons, lessonSelectionHandler)
          : null}
      </div>
    );
  });

  return (
    <div className={css.course}>
      <div className={css.title}>
        <span>Course Content</span>
      </div>

      {Modules}
    </div>
  );
};

const renderActiveMod = (activeModule, lessonSelectionHandler) => {
  const Lessons = activeModule.lessons.map(lsn => {
    return (
      <span
        className={css.lsn}
        key={lsn.id}
        onClick={() => lessonSelectionHandler(lsn.id, lsn.module)}>
        {lsn.title}
      </span>
    );
  });

  return (
    <div className={css.activeMod}>
      <span className={css.title}>Active Module</span>
      <span className={css.modBox}>{activeModule.title}</span>
      {Lessons}
    </div>
  );
};

const renderContent = (
  course,
  activeModule,
  lessonSelectionHandler,
  openMod,
  setOpenMod
) => {
  return (
    <>
      {renderActiveMod(activeModule, lessonSelectionHandler)}
      {renderCourseContent(
        course,
        lessonSelectionHandler,
        openMod,
        setOpenMod
      )}
    </>
  );
};

const renderActionBtns = () => {
  return (
    <>
      <button className={css.mark}>Mark Done</button>
      <button className={css.next}>Next Lesson</button>
    </>
  );
};

const renderCurrentLecture = (lesson = null) => {
  // TODO: change the iframe -
  // URLs like - "https://www.youtube.com/watch?v=RKLKib4bHhA" won't work dynamically.
  // change `watch?v=` to `embed/` and it'll start working
  return (
    <>
      <span className={css.title}>{lesson.title}</span>
      <div className={css.lecture}>
        <iframe
          src={"https://www.youtube.com/embed/RKLKib4bHhA"}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className={css.actionBtns}>{renderActionBtns()}</div>
      <div className={css.description}>
        <span className={css.heading}>Description</span>
        <p>{lesson.description}</p>
      </div>
      <div className={css.assignmentsBoard}>
        <span className={css.heading}>Assignments</span>
      </div>
    </>
  );
};

const ClassroomBase = props => {
  const [openMod, setOpenMod] = useState(0);
  console.log("active module => ", props.activeModule);
  if (
    props.course === undefined ||
    props.course === null ||
    props.activeModule === null
  ) {
    return renderLoader();
  }

  return (
    <div className={css.classroomBase}>
      <div className={css.head}>
        <span>{props.course.title}</span>
      </div>
      <div className={css.board}>
        <div className={css.content}>
          {renderContent(
            props.course,
            props.activeModule,
            props.lessonSelectionHandler,
            openMod,
            setOpenMod
          )}
        </div>
        <div className={css.lesson}>
          {renderCurrentLecture(props.activeLesson)}
        </div>
      </div>
    </div>
  );
};

export default ClassroomBase;
