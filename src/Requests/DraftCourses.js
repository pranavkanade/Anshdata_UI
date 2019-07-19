import { getAuthorization } from "./Authorization";
import getAdvResponse from "./response";

const URLS = {
  LIST_DRAFTED_COURSES_COMUNITY:
    "http://127.0.0.1:8000/api/course/drafts/comm/",
  LIST_DRAFTED_COURSES_ME: "http://127.0.0.1:8000/api/course/drafts/me/"
};

const getData = async (URL, saveCourseHandler) => {
  try {
    await fetch(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorization()
      }
    })
      .then(resp => resp.json())
      .then(data => {
        saveCourseHandler(data);
      });
  } catch (err) {
    console.log(
      "[Contrib.js] Failed to collect the list of drafted courses : ",
      err
    );
  }
};

export const getDraftedCommunityCoursesList = async saveCourseHandler => {
  const URL = URLS.LIST_DRAFTED_COURSES_COMUNITY;
  try {
    await fetch(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        saveCourseHandler(data);
      });
  } catch (err) {
    console.log(
      "[Contrib.js] Failed to collect the list of drafted courses : ",
      err
    );
  }
};

export const getDraftedSelfCoursesList = async saveCourseHandler => {
  getData(URLS.LIST_DRAFTED_COURSES_ME, saveCourseHandler);
};

export const publishCourse = async courseId => {
  const URL = `http://127.0.0.1:8000/api/course/${courseId}/pub/`;
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
    console.log("[DraftCourses.js] cannot published the course: ", err);
  }
};
