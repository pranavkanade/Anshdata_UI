import { getAuthorization } from "./Authorization";

const URLS = {
  LIST_COURSE: "http://127.0.0.1:8000/api/course/",
  LIST_COURSES_ENROLLED_IN: "http://127.0.0.1:8000/api/course/enrolled/"
};

export const getCoursesList = async coursesSaveHandler => {
  console.log("[Courses.js] get courses");
  try {
    await fetch(URLS.LIST_COURSE, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorization()
      }
    })
      .then(response => response.json())
      .then(data => coursesSaveHandler(data));
  } catch (err) {
    // This means we are dealing with anonymous user
    console.log(err);
  }
};

export const getEnrolledCoursesList = async coursesSaveHandler => {
  console.log("[Courses.js] get courses enrolled in");
  try {
    await fetch(URLS.LIST_COURSES_ENROLLED_IN, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorization()
      }
    })
      .then(response => response.json())
      .then(data => coursesSaveHandler(data));
  } catch (err) {
    // This means we are dealing with anonymous user
    console.log(err);
  }
};
