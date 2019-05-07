export const getCourse = async (courseId, courseSaveHandler) => {
  const URL = `http://127.0.0.1:8000/api/course/${courseId}/`;

  console.log("[Courses/Detailed-request] Retrieve course details");
  try {
    const retrieveCourse = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let course = await retrieveCourse.json();
    console.log("Course Details : ", course);
    courseSaveHandler(course);
  } catch (err) {
    console.log("[Courses/Detailed-request] user is not logged in : ", err);
  }
};
