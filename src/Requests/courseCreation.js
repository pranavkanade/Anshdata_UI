import { getAuthorization } from "./Authorization";

export const createCourseHandler = async (courseData, courseId) => {
  console.log("[Course/Form.js] Create Course clicked");
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
    console.log("Newly Created Course", newCourse);
  } catch (err) {
    console.log("[Course/Form.js] user is not logged in : ", err);
  }
};
