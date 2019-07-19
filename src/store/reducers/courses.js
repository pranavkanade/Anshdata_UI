import { setADStateToLocalStorage } from "../../utils/localStorage";
import actionTypes from "../actionTypes";

const initialState = {
  topCourses: null,
  draftCourse: null
};

const reducer = (state = initialState, action) => {
  let resp = null;
  switch (action.type) {
    case actionTypes.STORE_TOP_COURSES:
      resp = Object.assign({}, state, {
        topCourses: action.data
      });
      setADStateToLocalStorage({ crs: resp });
      return resp;
    case actionTypes.STORE_DETAILED_DRAFT_COURSE:
      resp = Object.assign({}, state, {
        draftCourse: action.data
      });
      return resp;
    default:
      return state;
  }
};

export default reducer;
