import { getAuthorization } from "./Authorization";
import getAdvResponse from "./response";

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

export const getPublishedCoursesList = async (usrId, saveHandler) => {
  console.log("[Courses.js] get courses enrolled in");
  const URL = `http://127.0.0.1:8000/api/course/pub/${usrId}/`;
  try {
    await fetch(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorization()
      }
    })
      .then(response => response.json())
      .then(data => saveHandler(data));
  } catch (err) {
    console.log(err);
  }
};

export const getCourse = async (courseId, courseSaveHandler) => {
  const URL = `http://127.0.0.1:8000/api/course/${courseId}/`;

  try {
    const retrieveCourse = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const resp = await getAdvResponse(retrieveCourse);
    console.log("[Courses/Detailed-request] Retrieve course details", resp);
    if (resp.ok && typeof courseSaveHandler === "function") {
      courseSaveHandler(resp.data);
    }
    return resp;
  } catch (err) {
    console.log("[Courses/Detailed-request] user is not logged in : ", err);
  }
};

export const draftCourse = async courseId => {
  console.log("[Courses.js] draft the course");
  const URL = `http://127.0.0.1:8000/api/course/${courseId}/draft/`;
  try {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorization()
      }
    });
    const advResp = await getAdvResponse(response);
    return advResp;
  } catch (err) {
    console.log("[Courses.js] cannot draft the course: ", err);
  }
};

export const deleteCourse = async courseId => {
  console.log("[Courses.js] draft the course");
  const URL = `http://127.0.0.1:8000/api/course/${courseId}/`;
  try {
    await fetch(URL, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorization()
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      });
  } catch (err) {
    console.log("[Courses.js] cannot draft the course: ", err);
  }
};

export const getTopPopularCoursesWithSaga = async () => {
  const URL = `http://127.0.0.1:8000/api/course/top/`;
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("[Courses.js] failed to fetch most popular courses", err);
  }
};
