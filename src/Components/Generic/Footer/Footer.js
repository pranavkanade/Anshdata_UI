import React from "react";
import Link from "next/link";

import css from "./Footer.scss";

const footer = props => {
  return (
    <div className={css.footer}>
      <div className={css.top}>
        <div>
          <span className={css.footer_links}>About us</span>
          <span className={css.footer_links}>Blog</span>
          <span className={css.footer_links}>Forum</span>
        </div>
        <div>
          <span className={css.footer_links}>Support us</span>
          <span className={css.footer_links}>Contact</span>
          <span className={css.footer_links}>Contribute</span>
        </div>
        <div>
          <Link href="/platform">
            <span className={css.footer_links}>Platform</span>
          </Link>
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
