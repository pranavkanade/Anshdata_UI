import React from "react";
import Link from "next/link";
import { Container, Grid, Button } from "semantic-ui-react";
import css from "./contribute.scss";

const contribute = props => {
  return (
    <div className={css.contribute}>
      <div className={css.hero}>
        <div className={css.choice}>
          <img src="/static/Imgs/Contribute-Hero/online_tutorial.svg" />
          <Link href="/contrib/course">
            <button>Add New Course</button>
          </Link>
        </div>
        <div className={css.choice}>
          <img src="/static/Imgs/Contribute-Hero/adjustment.svg" />
          <Link href="/contrib">
            <button>Update Drafted Course</button>
          </Link>
        </div>
        <div className={css.choice}>
          <img src="/static/Imgs/Contribute-Hero/teaching.svg" />
          <Link href="/contribute">
            <button>Review Requests</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default contribute;
