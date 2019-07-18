import actionTypes from "./actionTypes";

// Actions Users
export const storeUserSignedIn = data => {
  console.log("[Sign in action] Trying to store user: ", data);
  return { type: actionTypes.SIGN_IN, data: data };
};

export const requestUserSignIn = data => {
  console.log("[Request Sign in action] Trying authenticate user: ", data);
  return { type: actionTypes.REQUEST_USER_SIGN_IN, data: data };
};

export const storeUserSignedUp = data => {
  console.log("[Sign up action] Trying to store user: ", data);
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

// Actions Notifications
export const addNotificationError = data => {
  return { type: actionTypes.ADD_NOTIFICATION_ERROR, data: data };
};
