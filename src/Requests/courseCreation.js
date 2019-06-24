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
    if (modId !== null) {
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
