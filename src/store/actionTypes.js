const user = {
  SIGN_UP: "SIGN_UP",
  REQUEST_USER_SIGN_IN: "REQUEST_USER_SIGN_IN",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",

  USER_VERIFY: "USER_VERIFY",
  MAKE_USER_VERIFY: "MAKE_USER_VERIFY"
};

const course = {
  GET_TOP_COURSES: "GET_TOP_COURSES",
  STORE_TOP_COURSES: "STORE_TOP_COURSES",

  FETCH_DETAILED_DRAFT_COURSE: "FETCH_DETAILED_DRAFT_COURSE",
  UPDATE_DETAILED_DRAFT_COURSE: "UPDATE_DETAILED_DRAFT_COURSE",
  STORE_DETAILED_DRAFT_COURSE: "STORE_DETAILED_DRAFT_COURSE",

  FETCH_A_COURSE: "FETCH_A_COURSE",
  UPDATE_CURRENT_COURSE: "UPDATE_CURRENT_COURSE",

  ENTOLL_TO_COURSE: "ENTOLL_TO_COURSE",

  STORE_ENROLLED_COURSES: "STORE_ENROLLED_COURSES",
  FETCH_ENROLLED_COURSES: "FETCH_ENROLLED_COURSES",
  STORE_CATALOG_COURSES: "STORE_CATALOG_COURSES",
  FETCH_CATALOG_COURSES: "FETCH_CATALOG_COURSES",
  FETCH_UPDATED_COURSES: "FETCH_UPDATED_COURSES"
};

const notification = {
  ADD_NOTIFICATION_INFO: "ADD_NOTIFICATION_INFO",
  ADD_NOTIFICATION_ERROR: "ADD_NOTIFICATION_ERROR",
  ADD_NOTIFICATION_WARNING: "ADD_NOTIFICATION_WARNING",
  ADD_NOTIFICATION_SUCCESS: "ADD_NOTIFICATION_SUCCESS"
};

export default {
  ...user,
  ...course,
  ...notification
};
