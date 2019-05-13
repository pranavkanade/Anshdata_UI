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

const renderLessonContent = lesson => {
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

const Course = props => {
  if (props.course === undefined) {
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

export default Course;
