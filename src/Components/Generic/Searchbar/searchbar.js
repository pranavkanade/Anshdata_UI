import React from "react";
import css from "./searchbar.scss";

export default props => {
  // console.log("Initial Props: ", props.searchedValue);
  return (
    <div className={css.searchBar}>
      <div />
      <input
        placeholder={props.placeholder}
        name="searchbar"
        type="text"
        value={props.searchedValue}
        onChange={event => props.changeHandler(event.target.value)}
      />
      <button onClick={props.searchHandler}>Search</button>
      <div />
    </div>
  );
};
