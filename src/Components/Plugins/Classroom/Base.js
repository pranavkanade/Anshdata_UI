import React, { useState } from "react";
import Link from "next/link";

import css from "./Base.scss";

const renderLoader = () => {
  return (
    <div className={css.loader}>
      <div className={"ui active inverted centered inline loader massive"} />;
    </div>
  );
};

const renderLsnNAsign = (lessons, lessonSelectionHandler, assignments) => {
  const Lessons = lessons.map(lsn => {
    return (
      <span
        className={css.lsn}
        key={lsn.id}
        onClick={() => lessonSelectionHandler(lsn.id, lsn.module)}>
        {lsn.title}
      </span>
    );
  });

  const Assignments = assignments.map(asignmt => {
    // TODO: This is a hack to skip any assignment that may belong to a lesson.
    // Fix this in back so that only those asign will be here which need to
    //  e.g - course level and module level.
    if (asignmt.lesson !== null) {
      return null;
    }
    console.log("rendering assignment : ", asignmt);
    return (
      <span className={css.asignmt} key={asignmt.id}>
        {asignmt.title}
      </span>
    );
  });

  return (
    <>
      {Lessons}
      {Assignments}
    </>
  );
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
          ? renderLsnNAsign(
              mod.lessons,
              lessonSelectionHandler,
              mod.assignments
            )
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
      {renderLsnNAsign(
        activeModule.lessons,
        lessonSelectionHandler,
        activeModule.assignments
      )}
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

const renderAssignmentDetails = assignment => {
  return (
    <div className={css.detailed}>
      <span>{assignment.title}</span>
      <div className={css.instructions}>
        <span>Instructions</span>
        <p>{assignment.instruction}</p>
        <span>References</span>
        <p>{assignment.reference}</p>
      </div>
      <div className={css.action}>
        <button>Solve</button>
      </div>
    </div>
  );
};

const renderAssignmetns = (assignments, activeAsignmt, setActiveAsignmt) => {
  if (
    assignments === null ||
    assignments === undefined ||
    assignments.length === 0
  ) {
    return (
      <>
        <span className={css.heading}>Assignments</span>
        <br />
        <div className={css.notice}>
          <span>There are no assignments for this lesson!</span>
        </div>
      </>
    );
  }

  let detailedAssignment = {
    ...assignments.find(a => {
      return a.id === activeAsignmt;
    })
  };

  console.log("Assignment Detailed : ", detailedAssignment);
  return (
    <>
      <span className={css.heading}>Assignments</span>
      <div className={css.assignments}>
        <div className={css.listing}>
          {assignments.map(asignmt => (
            <div
              className={
                `${css.item} ` +
                (asignmt.id === activeAsignmt ? css.active : "")
              }
              onClick={() => setActiveAsignmt(asignmt.id)}>
              <span key={asignmt.id}>{asignmt.title}</span>
            </div>
          ))}
        </div>
        <div className={css.divider} />
        {activeAsignmt === 0
          ? null
          : renderAssignmentDetails(detailedAssignment)}
      </div>
    </>
  );
};

const renderCurrentLecture = (lesson, activeAsignmt, setActiveAsignmt) => {
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
        {renderAssignmetns(
          lesson.assignments,
          activeAsignmt,
          setActiveAsignmt
        )}
      </div>
    </>
  );
};

const ClassroomBase = props => {
  const [openMod, setOpenMod] = useState(0);
  const [activeAsignmt, setActiveAsignmt] = useState(0);
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
        <Link href={`/courses/${props.course.id}`}>
          <span>{props.course.title}</span>
        </Link>
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
          {props.activeLesson !== null && props.activeLesson !== undefined
            ? renderCurrentLecture(
                props.activeLesson,
                activeAsignmt,
                setActiveAsignmt
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default ClassroomBase;
