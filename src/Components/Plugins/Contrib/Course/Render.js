import React from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  Icon,
  Divider
} from "semantic-ui-react";
import Link from "next/link";
import { enrollEventHandler } from "../../../../Requests/Enrollment";
import createCourseHandler from "./Action";
import css from "./render.scss";

const renderButtons = props => {
  console.log("render course type", props.type);
  if (props.type !== "detail") {
    // TODO: Style these buttons
    return (
      <>
        <Grid.Column width="4">
          <Button
            fluid
            basic
            size="big"
            color="red"
            name="course"
            onClick={event => props.addHandler(event.target.name)}>
            <Icon name="pencil" size="small" /> Edit Course
          </Button>
          <Divider hidden />
          <Link href={`/courses/${props.course.id}`}>
            <Button
              fluid
              basic
              size="big"
              color="green"
              name="publish"
              onClick={() => {
                const data = {
                  is_published: true
                };
                createCourseHandler(data, props.course.id);
              }}>
              <Icon name="paper plane outline" size="small" />
              Publish Course
            </Button>
          </Link>
        </Grid.Column>
      </>
    );
  } else if (props.isEnrolled) {
    return (
      <Link href={`/courses/attend/${props.course.id}`}>
        <button className={css.attend}>Attend</button>
      </Link>
    );
  }
  return (
    <Link href={`/courses/${props.course.id}`}>
      <button
        className={css.enroll}
        onClick={() => enrollEventHandler(props.course.id)}>
        Enroll
      </button>
    </Link>
  );
};

const courseRender = props => {
  return (
    <div>
      <h1 className={css.heading}>{props.course.title}</h1>
      <hr />
      <div className={css.extraOne}>
        <div className={css.descBox}>
          <p>{props.course.description}</p>
        </div>
        <div className={css.detailBox}>
          <div className={css.item}>
            <text className={css.heading}>Credit Points</text>
            <text className={css.value}>{props.course.credit_points}</text>
          </div>
          <div className={css.item}>
            <text className={css.heading}>Category</text>
            <text className={css.value}>{props.course.category.title}</text>
          </div>
          <div className={css.item}>
            <text className={css.heading}>Subject</text>
            <text className={css.value}>{props.course.subject}</text>
          </div>
        </div>
      </div>
      <div className={css.extraTwo}>
        {renderButtons(props)}
        <div className={css.tagBox}>tagbox</div>
      </div>
    </div>
  );
};

export default courseRender;
