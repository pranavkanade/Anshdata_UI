import { getAuthorization } from "./Authorization";
import getAdvResponse from "./response";

const URLS = {
  LIST_DRAFTED_COURSES_COMUNITY:
    "/api/course/drafts/comm/",
  LIST_DRAFTED_COURSES_ME: "/api/course/drafts/me/"
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
  } catch (err) {}
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
  } catch (err) {}
};

export const getDraftedSelfCoursesList = async saveCourseHandler => {
  getData(URLS.LIST_DRAFTED_COURSES_ME, saveCourseHandler);
};

export const publishCourse = async courseId => {
  const URL = `/api/course/${courseId}/pub/`;
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
