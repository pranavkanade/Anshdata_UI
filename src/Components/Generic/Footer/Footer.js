import React from "react";
import Link from "next/link";

import css from "./Footer.scss";

const footer = props => {
  return (
    <div className={css.footer}>
      <div className={css.top}>
        <div>
          <span>About us</span>
          <span>Blog</span>
          <span>Forum</span>
        </div>
        <div>
          <span>Support us</span>
          <span>Contact</span>
          <span>Contribute</span>
        </div>
        <div>
          <span>Facebook</span>
          <span>Twitter</span>
          <span>Youtube</span>
        </div>
      </div>
      <div className={css.bottom}>
        <div className={css.brandLogo}>
          <Link href="/">
            <span>Anshdata</span>
          </Link>
        </div>

        <div className={css.copywrite}>
          <span>Copywrite &#9400; 2019 </span>
          <span>Anshdata Inc.</span>
        </div>

        <div className={css.terms}>
          <span>Terms</span>
        </div>
      </div>
    </div>
  );
};

export default footer;
