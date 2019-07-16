import { setADStateToLocalStorage } from "../../utils/localStorage";
import actionTypes from "../actionTypes";

const initialState = {
  topCourses: null
};

const reducer = (state = initialState, action) => {
  let resp = null;
  switch (action.type) {
    case actionTypes.STORE_TOP_COURSES:
      resp = Object.assign({}, state, {
        topCourses: action.data
      });
      console.log("[Course Reducer] Storing Top Courses : ", resp);
      setADStateToLocalStorage({ crs: resp });
      return resp;
    default:
      return state;
  }
};

export default reducer;
