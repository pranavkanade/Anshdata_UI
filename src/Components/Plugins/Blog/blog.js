import React from "react";
import css from "./blog.scss";

const blog = () => {
  return (
    <div className={css.page}>
      <h1 className={css.page_title}>
        <span>"Anshdata"</span> Blog
      </h1>
      <div className={css.description}>
        <p>
          Anshdata is the open education platform, where users can learn new
          skills and get certified in the areas of their interests. The main
          difference between us and platforms like edX and Coursera is that
          Anshdata is community driven(explained below) and so, user is going
          to have an option of getting certified for “free of cost”.
        </p>
      </div>
    </div>
  );
};

export default blog;
