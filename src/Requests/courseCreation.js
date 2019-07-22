import { getAuthorization } from "./Authorization";
import getAdvResponse from "./response";

export const createCourseHandler = async ({ courseData, courseId }) => {
  try {
    let mthd = "POST";
    let URL = "http://127.0.0.1:8000/api/course/";
    if (courseId !== null && courseId !== undefined && courseId !== 0) {
      mthd = "PATCH";
      URL = `http://127.0.0.1:8000/api/course/${courseId}/`;
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
  } catch (err) {
    console.log("[Course/Form.js] user is not logged in : ", err);
  }
};

export const createModuleHandler = async ({ modData, modId }) => {
  try {
    let mthd = "POST";
    let URL = `http://127.0.0.1:8000/api/course/mod/`;
    if (modId !== null && modId !== undefined && modId !== 0) {
      mthd = "PATCH";
      URL = `http://127.0.0.1:8000/api/course/mod/${modId}/`;
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
  } catch (err) {
    console.log("[Module/Action.js] Error when creating a module : ", err);
  }
};

export const createLessonHandler = async ({ lsnData, lsnId }) => {
  try {
    let mthd = "POST";
    let URL = "http://127.0.0.1:8000/api/course/lsn/";
    if (lsnId !== null && lsnId !== undefined && lsnId !== 0) {
      mthd = "PATCH";
      URL = `http://127.0.0.1:8000/api/course/lsn/${lsnId}/`;
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
  } catch (err) {
    console.log("[Lesson/Action.js] Error when creating a lesson : ", err);
  }
};

export const createAssignmentHandler = async ({ assignmentData, exId }) => {
  try {
    let mthd = "POST";
    let URL = "http://127.0.0.1:8000/api/course/ex/";
    if (exId !== null && exId !== undefined && exId !== 0) {
      mthd = "PATCH";
      URL = `http://127.0.0.1:8000/api/course/ex/${exId}/`;
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
  } catch (err) {
    console.log(
      "[Assignment/Action.js] Error when creating an assignment : ",
      err
    );
  }
};
