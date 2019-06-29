import { getAuthorization } from "./Authorization";

export const createCourseHandler = async (courseData, courseId = null) => {
  console.log("[Course/Form.js] Create Course clicked : ", courseData);
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
    // console.log("Newly Created Course", newCourse);
    return newCourse.id;
  } catch (err) {
    console.log("[Course/Form.js] user is not logged in : ", err);
  }
};

export const createModuleHandler = async (modData, modId = null) => {
  console.log("[Module/Action.js] create new module: ", modData);
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
    // const page = window.location.pathname;
    console.log("New Module : ", newModule);
    // Router.push(page);
    return newModule.course;
  } catch (err) {
    console.log("[Module/Action.js] Error when creating a module : ", err);
  }
};

export const createLessonHandler = async (lsnData, lsnId = null) => {
  console.log("[Lesson/Action.js] create new lesson: ", lsnData);

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

    console.log("Lesson Created ", newLesson);

    // const page = window.location.pathname;

    // Router.push(page);
  } catch (err) {
    console.log("[Lesson/Action.js] Error when creating a lesson : ", err);
  }
};

export const createAssignmentHandler = async (assignmentData, exId = null) => {
  console.log(
    "[Assignment/Action.js] create new assignment: ",
    assignmentData
  );

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
        // console.log(response);
        return response.json();
      })
      .then(data => {
        console.log("Assignment Created ", data);
      });
  } catch (err) {
    console.log(
      "[Assignment/Action.js] Error when creating an assignment : ",
      err
    );
  }
};
