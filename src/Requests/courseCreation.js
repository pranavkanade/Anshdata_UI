import { getAuthorization } from "./Authorization";

export const createCourseHandler = async (courseData, courseId = null) => {
  try {
    let mthd = "POST";
    let URL = "http://127.0.0.1:8000/api/course/";
    if (courseId !== null) {
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
    let newCourse = await createCourseRes.json();
    return newCourse.id;
  } catch (err) {
    console.log("[Course/Form.js] user is not logged in : ", err);
  }
};

export const createModuleHandler = async (modData, modId = null) => {
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
    let newModule = await moduleCreated.json();
    return newModule.course;
  } catch (err) {
    console.log("[Module/Action.js] Error when creating a module : ", err);
  }
};

export const createLessonHandler = async (lsnData, lsnId = null) => {
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

    let newLesson = await lessonCreated.json();
  } catch (err) {
    console.log("[Lesson/Action.js] Error when creating a lesson : ", err);
  }
};

export const createAssignmentHandler = async (assignmentData, exId = null) => {
  try {
    let mthd = "POST";
    let URL = "http://127.0.0.1:8000/api/course/ex/";
    if (exId !== null && exId !== undefined && exId !== 0) {
      mthd = "PATCH";
      URL = `http://127.0.0.1:8000/api/course/ex/${exId}/`;
    }

    await fetch(URL, {
      method: mthd,
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(assignmentData)
    })
      .then(response => {
        return response.json();
      })
      .then(data => data);
  } catch (err) {
    console.log(
      "[Assignment/Action.js] Error when creating an assignment : ",
      err
    );
  }
};
