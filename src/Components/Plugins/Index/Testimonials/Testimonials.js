import React from "react";
import Link from "next/link";

import css from "./Testimonials.scss";

const renderTestimonials = props => {
  return (
    <div className={css.testimonials}>
      <div className={css.item}>
        <img src="../../../../../static/assets/imgs/user.png" />
        <div className={css.box}>
          <span>
            The quick, brown fox jumps over a lazy dog. DJs flock by when MTV
            ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
            quartz, vex nymphs. The quick, brown fox jumps over a lazy dog. DJs
            flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps.
            Bawds jog, flick quartz, vex nymphs.
          </span>
        </div>
      </div>

      <div className={css.item}>
        <img src="../../../../../static/assets/imgs/user.png" />
        <div className={css.box}>
          <span>
            The quick, brown fox jumps over a lazy dog. DJs flock by when MTV
            ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
            quartz, vex nymphs.
          </span>
        </div>
      </div>

      <div className={css.item}>
        <img src="../../../../../static/assets/imgs/user.png" />
        <div className={css.box}>
          <span>
            The quick, brown fox jumps over a lazy dog. DJs flock by when MTV
            ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
            quartz, vex nymphs.
          </span>
        </div>
      </div>
    </div>
  );
};

export default props => {
  return (
    <div className={css.container}>
      <span>Testimonials</span>
      {renderTestimonials()}
      <div className={css.btnBox}>
        <div />
        <div className={css.btns}>
          <Link href="/courses">
            <button className={css.exploreBtn}>Start Exploring</button>
          </Link>
          <Link href="/contribute">
            <button className={css.contributeBtn}>Contribute Now</button>
          </Link>
        </div>
        <div />
      </div>
    </div>
  );
};
