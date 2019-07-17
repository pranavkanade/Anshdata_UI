const user = {
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",

  USER_VERIFY: "USER_VERIFY",
  MAKE_USER_VERIFY: "MAKE_USER_VERIFY"
};

const course = {
  GET_TOP_COURSES: "GET_TOP_COURSES",
  STORE_TOP_COURSES: "STORE_TOP_COURSES"
};

export default {
  ...user,
  ...course
};
