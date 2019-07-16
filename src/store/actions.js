import actionTypes from "./actionTypes";

// Actions
export const storeUserSignedIn = data => {
  console.log("[Sign in action] Trying to store user: ", data);
  return { type: actionTypes.SIGN_IN, data: data };
};

export const storeUserSignedUp = data => {
  console.log("[Sign up action] Trying to store user: ", data);
  return { type: actionTypes.SIGN_UP, data: data };
};

export const storeUserSignedOut = () => {
  return { type: actionTypes.SIGN_OUT };
};

export const storeTopCourses = data => {
  return { type: actionTypes.STORE_TOP_COURSES, data: data };
};

export const getTopCourses = () => {
  return { type: actionTypes.GET_TOP_COURSES };
};
