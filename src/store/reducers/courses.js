import { setADStateToLocalStorage } from "../../utils/localStorage";
import actionTypes from "../actionTypes";

const initialState = {
  topCourses: null,
  draftCourse: null,
  currentCourse: null,
  catalogCourses: null,
  enrolledCourses: null
};

const reducer = (state = initialState, action) => {
  let resp = null;
  switch (action.type) {
    case actionTypes.STORE_TOP_COURSES:
      resp = Object.assign({}, state, {
        topCourses: action.data
      });
      setADStateToLocalStorage({ crs: { topCourses: resp.topCourses } });
      return resp;
    case actionTypes.STORE_DETAILED_DRAFT_COURSE:
      resp = Object.assign({}, state, {
        draftCourse: action.data
      });
      return resp;
    case actionTypes.UPDATE_CURRENT_COURSE:
      resp = Object.assign({}, state, {
        currentCourse: action.data
      });
      return resp;
    case actionTypes.STORE_ENROLLED_COURSES:
      resp = Object.assign({}, state, {
        enrolledCourses: action.data
      });
      return resp;
    case actionTypes.STORE_CATALOG_COURSES:
      resp = Object.assign({}, state, {
        catalogCourses: action.data
      });
      return resp;
    default:
      return state;
  }
};

export default reducer;
