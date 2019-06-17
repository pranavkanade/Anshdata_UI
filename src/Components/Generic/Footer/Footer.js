import React from "react";
import Link from "next/link";

import css from "./Footer.scss";

const footer = props => {
  return (
    <div className={css.footer}>
      <div className={css.brandLogo}>
        <Link href="/">
          <button>Anshdata</button>
        </Link>
      </div>
    </div>
  );
};

export default footer;
