import actionTypes from "./actionTypes";

// Actions Users
export const storeUserSignedIn = data => {
  return { type: actionTypes.SIGN_IN, data: data };
};

export const requestUserSignIn = data => {
  return { type: actionTypes.REQUEST_USER_SIGN_IN, data: data };
};

export const storeUserSignedUp = data => {
  return { type: actionTypes.SIGN_UP, data: data };
};

export const storeUserSignedOut = () => {
  return { type: actionTypes.SIGN_OUT };
};

export const storeUserVerify = data => {
  return { type: actionTypes.USER_VERIFY, data: data };
};

export const makeUserVerify = () => {
  return { type: actionTypes.MAKE_USER_VERIFY };
};

// Actions Courses
export const storeTopCourses = data => {
  return { type: actionTypes.STORE_TOP_COURSES, data: data };
};

export const getTopCourses = () => {
  return { type: actionTypes.GET_TOP_COURSES };
};

export const fetchDetailedDraftCourse = data => {
  return { type: actionTypes.FETCH_DETAILED_DRAFT_COURSE, data: data };
};

export const updateDetailedDraftCourse = data => {
  return { type: actionTypes.UPDATE_DETAILED_DRAFT_COURSE, data: data };
};

export const storeDetailedDraftCourse = data => {
  return { type: actionTypes.STORE_DETAILED_DRAFT_COURSE, data: data };
};

// Actions Notifications
export const addNotificationError = data => {
  return { type: actionTypes.ADD_NOTIFICATION_ERROR, data: data };
};
