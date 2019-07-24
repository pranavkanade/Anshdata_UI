import { getAuthorization } from "./Authorization";
import getAdvResponse from "./response";

export const createCourseHandler = async ({ courseData, courseId }) => {
  try {
    let mthd = "POST";
    let URL = "/api/course/";
    if (courseId !== null && courseId !== undefined && courseId !== 0) {
      mthd = "PATCH";
      URL = `/api/course/${courseId}/`;
    }
    const createCourseRes = await fetch(URL, {
      method: mthd,
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(courseData)
    });
    const advResponse = await getAdvResponse(createCourseRes);
    return advResponse;
  } catch (err) {}
};

export const createModuleHandler = async ({ modData, modId }) => {
  try {
    let mthd = "POST";
    let URL = `/api/course/mod/`;
    if (modId !== null && modId !== undefined && modId !== 0) {
      mthd = "PATCH";
      URL = `/api/course/mod/${modId}/`;
    }

    const moduleCreated = await fetch(URL, {
      method: mthd,
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(modData)
    });
    const advResponse = await getAdvResponse(moduleCreated);
    return advResponse;
  } catch (err) {}
};

export const createLessonHandler = async ({ lsnData, lsnId }) => {
  try {
    let mthd = "POST";
    let URL = "/api/course/lsn/";
    if (lsnId !== null && lsnId !== undefined && lsnId !== 0) {
      mthd = "PATCH";
      URL = `/api/course/lsn/${lsnId}/`;
    }

    const lessonCreated = await fetch(URL, {
      method: mthd,
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(lsnData)
    });
    const advResponse = await getAdvResponse(lessonCreated);
    return advResponse;
  } catch (err) {}
};

export const createAssignmentHandler = async ({ assignmentData, exId }) => {
  try {
    let mthd = "POST";
    let URL = "/api/course/ex/";
    if (exId !== null && exId !== undefined && exId !== 0) {
      mthd = "PATCH";
      URL = `/api/course/ex/${exId}/`;
    }

    const resp = await fetch(URL, {
      method: mthd,
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(assignmentData)
    });
    const advResponse = await getAdvResponse(resp);
    return advResponse;
  } catch (err) {}
};
