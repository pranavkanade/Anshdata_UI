import { getAuthorization } from "./Authorization";

const URLS = {
  LIST_DRAFTED_COURSES_COMUNITY:
    "http://127.0.0.1:8000/api/course/drafts/comm/",
  LIST_DRAFTED_COURSES_ME: "http://127.0.0.1:8000/api/course/drafts/me/"
};

const getData = async (URL, saveCourseHandler) => {
  console.log("[Contrib.js] get Courses user has not yet published");
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
        console.log(data);
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
  // Only if the user is logged in
  console.log(
    "[Contrib.js] get Courses user has not yet published by community"
  );
  getData(URLS.LIST_DRAFTED_COURSES_COMUNITY, saveCourseHandler);
};

export const getDraftedSelfCoursesList = async saveCourseHandler => {
  // Only if the user is logged in
  console.log(
    "[Contrib.js] get Courses user has not yet published by current user"
  );
  getData(URLS.LIST_DRAFTED_COURSES_ME, saveCourseHandler);
};

export const publishCourse = async courseId => {
  console.log("[DraftCourses.js] publish the course");
  const URL = `http://127.0.0.1:8000/api/course/${courseId}/pub/`;
  try {
    await fetch(URL, {
      method: "PATCH",
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
    console.log("[DraftCourses.js] cannot published the course: ", err);
  }
};
