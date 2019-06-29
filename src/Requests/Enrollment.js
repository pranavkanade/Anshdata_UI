import Router from "next/router";
import { getAuthorization } from "./Authorization";
const URLS = {
  PATCH_COURSE_ENROLL: "http://127.0.0.1:8000/api/course/enroll/"
};

export const enrollEventHandler = async courseKey => {
  console.log("[Actions/Enroll.js] enroll in a course: ", courseKey);
  try {
    const enrollmentData = {
      course: String(courseKey)
    };
    // console.log("URL", URLS.PATCH_COURSE_ENROLL);
    await fetch(URLS.PATCH_COURSE_ENROLL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(enrollmentData)
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log("Enrolled into ", data);
      });
  } catch (err) {
    console.log("[Enroll.js] Error when enrolling to a course : ", err);
  }
};

export const getIfEnrolled = async (courseId, ifEnrolledSaveHandler) => {
  console.log("[Courses.js] get if user is enrolled in");
  const GET_IF_ENROLLED = `http://127.0.0.1:8000/api/course/enrolledin/${courseId}`;
  try {
    await fetch(GET_IF_ENROLLED, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: getAuthorization()
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => console.log("Enrollment err ", err))
      .then(data => ifEnrolledSaveHandler(data));
  } catch (err) {
    // This means we are dealing with anonymous user
    console.log(err);
  }
};
