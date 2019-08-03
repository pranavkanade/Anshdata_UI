import React, { useState } from "react";
import { Dialog, Pane } from "evergreen-ui";

import Category from "../../Generic/Forms/category";
import Tag from "../../Generic/Forms/tag";
import css from "./platform.scss";

const FORMTYPE = {
  TAG: "TAG",
  CATEGORY: "CATEGORY"
};

const renderForm = (type, onClose) => {
  return (
    <Dialog
      preventBodyScrolling
      isShown={true}
      title={
        type === FORMTYPE.TAG ? "Create new 'Tag'" : "Create new 'Category'"
      }
      onCloseComplete={onClose}
      hasFooter={false}>
      <div>
        {type === FORMTYPE.TAG ? (
          <Tag onClose={onClose} />
        ) : (
          <Category onClose={onClose} />
        )}
      </div>
    </Dialog>
  );
};

export default props => {
  const [formType, setFormType] = useState(FORMTYPE.CATEGORY);
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className={css.page}>
      <h1 className={css.page_title}>
        Welcome to <span>"Anshdata"</span>!
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
      <hr />
      <div className={css.operations}>
        <div className={css.toolbar}>
          <button
            className={css.cat}
            onClick={() => {
              setFormType(FORMTYPE.CATEGORY);
              setOpenForm(true);
            }}>
            Add Category
          </button>
          <button
            className={css.tag}
            onClick={() => {
              setFormType(FORMTYPE.TAG);
              setOpenForm(true);
            }}>
            Add Tag
          </button>
        </div>
      </div>
      <div>
        {openForm ? renderForm(formType, () => setOpenForm(false)) : null}
      </div>
    </div>
  );
};
