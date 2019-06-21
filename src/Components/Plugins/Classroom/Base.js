import React from "react";
import {
  Segment,
  Header,
  Dimmer,
  Loader,
  Grid,
  Container,
  Accordion,
  Embed
} from "semantic-ui-react";

import css from "./Base.scss";

const renderLessonContent = lesson => {
  if (lesson === undefined) {
    return null;
  }
  console.log("Lect ID", lesson);
  let lectId = null;
  if (lesson.lecture !== null && lesson.lecture !== undefined) {
    lectId = lesson.lecture.split("?v=")[1];
  }
  return (
    <Segment attached>
      <Header>{lesson.title}</Header>
      <br />
      <br />
      {lectId !== null ? (
        <Embed active autoplay={true} id={lectId} source="youtube" />
      ) : (
        <Embed />
      )}
      <br />
      <Segment color="violet">{lesson.description}</Segment>
    </Segment>
  );
};

const renderAssignmentContent = assignment => {
  return <Header>{assignment.title}</Header>;
};

const renderCurrent = props => {
  return (
    <Segment basic>
      {props.activeLesson === null
        ? null
        : renderLessonContent(props.activeLesson)}
      {props.activeAssign === null
        ? null
        : renderAssignmentContent(props.activeAssign)}
    </Segment>
  );
};

const renderAssignment = (assign, extra) => {
  return (
    <Segment
      key={assign.id}
      inverted
      color="olive"
      attached
      onClick={() => extra.activeAssignmentHandler(assign)}>
      {assign.title}
    </Segment>
  );
};

const renderLesson = (lsn, extra) => {
  const assignments = lsn.assignments.map(assign => {
    return renderAssignment(assign, extra);
  });

  return (
    <div key={lsn.id}>
      <Segment
        attached
        key={lsn.id}
        onClick={() => extra.activeLessonHandler(lsn)}>
        <Header size="small">{`${lsn.title}`.toUpperCase()}</Header>
      </Segment>
      {assignments}
      <br />
    </div>
  );
};

const renderModuleLessons = (lessons, extra) => {
  return lessons.map(lsn => {
    return renderLesson(lsn, extra);
  });
};

const renderModule = (mod, extra) => {
  return (
    <Segment vertical key={mod.id}>
      <Accordion key={mod.id}>
        <Accordion.Title
          active={mod.id === extra.activeModId}
          onClick={() => extra.modExpandHandler(mod.id)}>
          <Header size="medium">{`${mod.title}`.toUpperCase()}</Header>
        </Accordion.Title>
        <Accordion.Content active={mod.id === extra.activeModId}>
          {renderModuleLessons(mod.lessons, extra)}
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};

const renderCourseModules = (modules, extra) => {
  return modules.map(mod => {
    return renderModule(mod, extra);
  });
};

const renderCourseSidebar = props => {
  const course = props.course;
  const extra = {
    modExpandHandler: props.modExpandHandler,
    activeLessonHandler: props.activeLessonHandler,
    activeAssignmentHandler: props.activeAssignmentHandler,
    activeModId: props.activeModId,
    activeLesson: props.activeLesson,
    activeAssign: props.activeAssign
  };
  return (
    <>
      <Segment attached>
        <Header size="large">{`${course.title}`.toUpperCase()}</Header>
      </Segment>
      {renderCourseModules(course.modules, extra)}
    </>
  );
};

const renderLoader = () => {
  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <Segment basic>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    </Container>
  );
};

const Course = props => {
  if (props.course === undefined) {
    return renderLoader();
  }
  return (
    <>
      <br />
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column width="1" />
          <Grid.Column width="4">{renderCourseSidebar(props)}</Grid.Column>
          <Grid.Column width="10">{renderCurrent(props)}</Grid.Column>
          <Grid.Column width="1" />
        </Grid.Row>
      </Grid>
    </>
  );
};

const renderCourseContent = (course = null) => {
  return null;
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
  if (props.course === undefined) {
    return renderLoader();
  }

  return (
    <div className={css.classroomBase}>
      <div className={css.head}>
        <span>{props.course.title}</span>
      </div>
      <div className={css.board}>
        <div className={css.courseContent}>{renderCourseContent()}</div>
        <div className={css.lesson}>
          {renderCurrentLecture(props.course.modules[0].lessons[0])}
        </div>
      </div>
    </div>
  );
};

export default ClassroomBase;
