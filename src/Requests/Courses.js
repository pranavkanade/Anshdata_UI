import { getAuthorization } from "./Authorization";
import getAdvResponse from "./response";

const URLS = {
  LIST_COURSE: "http://127.0.0.1:8000/api/course/",
  LIST_COURSES_ENROLLED_IN: "http://127.0.0.1:8000/api/course/enrolled/"
};

export const getCoursesList = async (coursesSaveHandler = () => {}) => {
  const auth = getAuthorization();
  let headers = null;
  if (auth !== "") {
    headers = {
      "content-type": "application/json",
      Authorization: auth
    };
  } else {
    headers = {
      "content-type": "application/json"
    };
  }
  try {
    const resp = await fetch(URLS.LIST_COURSE, {
      method: "GET",
      headers: headers
    });
    const advResp = await getAdvResponse(resp);
    coursesSaveHandler(advResp.data);
    return advResp;
  } catch (err) {}
};

export const getEnrolledCoursesList = async (
  coursesSaveHandler = () => {}
) => {
  try {
    const resp = await fetch(URLS.LIST_COURSES_ENROLLED_IN, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorization()
      }
    });
    const advResp = await getAdvResponse(resp);
    coursesSaveHandler(advResp.data);
    return advResp;
  } catch (err) {}
};

export const getPublishedCoursesList = async (usrId, saveHandler) => {
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
  } catch (err) {}
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
    if (resp.ok && typeof courseSaveHandler === "function") {
      courseSaveHandler(resp.data);
    }
    return resp;
  } catch (err) {}
};

export const draftCourse = async courseId => {
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
  } catch (err) {}
};

export const deleteCourse = async courseId => {
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
      .then(data => data);
  } catch (err) {}
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
  } catch (err) {}
};
