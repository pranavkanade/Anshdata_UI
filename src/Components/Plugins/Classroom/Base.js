import React, { useState } from "react";
import Link from "next/link";
import ReactPlayer from "react-player";
import { Sidenav, Nav, Button, Icon, Drawer, Dropdown } from "rsuite";
import css from "./Base.scss";

const renderLoader = () => {
  return (
    <div className={css.loader}>
      <div className={"ui active inverted centered inline loader massive"} />;
    </div>
  );
};

const findNextLesson = (currentLesson, lessonList) => {
  const lessonIdx = lessonList.findIndex(lsn => {
    return lsn.lsnId === currentLesson;
  });
  return lessonList[lessonIdx + 1];
};

const renderActionBtns = (lesson, lessonList, nextHandler, setCompleted) => {
  const nextLesson = findNextLesson(lesson, lessonList);
  return (
    <>
      <button
        className={css.mark}
        onClick={() => {
          setCompleted("LESSON", lesson);
          if (nextLesson !== undefined) {
            nextHandler(nextLesson.lsnId, nextLesson.modId);
          }
        }}>
        Done
        <img src="/static/assets/icon/done_all_24px_outlined.svg" />
      </button>
      {nextLesson !== undefined ? (
        <button
          className={css.next}
          onClick={() => {
            nextHandler(nextLesson.lsnId, nextLesson.modId);
          }}>
          Next
          <img src="/static/assets/icon/arrow_forward_ios_24px_outlined.svg" />
        </button>
      ) : null}
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
              key={asignmt.id}
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

const renderCurrentLecture = (
  lesson,
  activeAsignmt,
  setActiveAsignmt,
  setCourseProgress,
  setCompleted,
  lessonList,
  nextHandler
) => {
  // TODO: remove lesson id from title
  return (
    <>
      <span className={css.title}>{lesson.title}</span>
      <div className={css.lecture}>
        <ReactPlayer
          url={lesson.lecture}
          controls
          pip={true}
          height="100%"
          width="100%"
          onStart={() => {
            setCourseProgress("LESSON", lesson.id);
          }}
          onEnded={() => setCompleted("LESSON", lesson.id)}
        />
      </div>
      <div className={css.actionBtns}>
        {renderActionBtns(lesson.id, lessonList, nextHandler, setCompleted)}
      </div>
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

const getLessonList = course => {
  let lessons = [];
  course.modules.forEach(mod => {
    lessons = lessons.concat(
      mod.lessons.map(lsn => {
        return {
          lsnId: lsn.id,
          modId: lsn.module
        };
      })
    );
  });
  return lessons;
};

const renderFullCourseContent = (
  shouldShow,
  closeHandler,
  course,
  activeLsn,
  activeMod,
  selectionHandler
) => {
  return (
    <Drawer size="xs" placement="left" show={shouldShow} onHide={closeHandler}>
      <Drawer.Header>
        <Drawer.Title>{course.title}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <Sidenav appearance="subtle" defaultOpenKeys={[activeMod]}>
          <Sidenav.Body>
            <Nav>
              {course.modules.map(mod => {
                return (
                  <Dropdown
                    placement="rightTop"
                    eventKey={mod.id}
                    key={mod.id}
                    title={mod.title}
                    icon={<Icon icon="magic" />}>
                    {mod.lessons.map(lsn => {
                      const active = lsn.id === activeLsn;
                      const icon = active ? <Icon icon="arrow-right" /> : null;
                      return (
                        <Dropdown.Item
                          eventKey={lsn.id}
                          key={lsn.id}
                          active={active}
                          icon={icon}
                          onClick={() => selectionHandler(lsn.id, mod.id)}>
                          {lsn.title}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown>
                );
              })}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Drawer.Body>
      <Drawer.Footer>
        <Button onClick={closeHandler} appearance="primary">
          Confirm
        </Button>
        <Button onClick={closeHandler} appearance="subtle">
          Cancel
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
};

const activeModuleSidebar = (
  activeModule,
  activeLesson,
  lessonSelectionHandler
) => {
  const lessons = activeModule.lessons.map(lsn => {
    const active = lsn.id === activeLesson.id;
    const icon = active ? <Icon icon="arrow-right" /> : null;
    return (
      <Nav.Item
        key={lsn.id}
        eventKey={lsn.id}
        active={active}
        icon={icon}
        onClick={() => lessonSelectionHandler(lsn.id, lsn.module)}>
        {lsn.title}
      </Nav.Item>
    );
  });
  const headerStyles = {
    padding: 20,
    fontSize: 20,
    fontWeight: 600,
    background: "#34c3ff",
    color: " #fff"
  };
  return (
    <div className={css.adSidenav}>
      <Sidenav appearance="subtle">
        <Sidenav.Header>
          <div className={css.title} style={headerStyles}>
            <Icon className={css.icon} icon="cube" size="2x" />{" "}
            {activeModule.title}
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>{lessons}</Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

const ClassroomBase = props => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeAsignmt, setActiveAsignmt] = useState(0);
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
        <Link href="/courses/[crsId]" as={`/courses/${props.course.id}`}>
          <span>{props.course.title}</span>
        </Link>
      </div>
      <div className={css.board}>
        <div className={css.courseContent}>
          <div className={css.fullCourseBar}>
            <Button
              color="violet"
              size="lg"
              onClick={() => setOpenDrawer(true)}>
              <Icon icon="book2" size="lg" /> Full Course Content
            </Button>
            {renderFullCourseContent(
              openDrawer,
              () => setOpenDrawer(false),
              props.course,
              props.activeLesson.id,
              props.activeModule.id,
              props.lessonSelectionHandler
            )}
          </div>
          {activeModuleSidebar(
            props.activeModule,
            props.activeLesson,
            props.lessonSelectionHandler
          )}
        </div>
        <div className={css.lesson}>
          {props.activeLesson !== null && props.activeLesson !== undefined
            ? renderCurrentLecture(
                props.activeLesson,
                activeAsignmt,
                setActiveAsignmt,
                props.setCourseProgress,
                props.setCompleted,
                getLessonList(props.course),
                props.lessonSelectionHandler
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default ClassroomBase;
