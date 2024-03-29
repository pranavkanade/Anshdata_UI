import Router from "next/router";
import { getAuthorization } from "./Authorization";
import getAdvResponse from "./response";
const URLS = {
  PATCH_COURSE_ENROLL: "/api/course/enroll/"
};

export const enrollEventHandler = async courseKey => {
  try {
    const enrollmentData = {
      course: String(courseKey)
    };
    const response = await fetch(URLS.PATCH_COURSE_ENROLL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(enrollmentData)
    });
    const actualResp = await response;
    const resp = await getAdvResponse(response);
    return resp;
  } catch (err) {}
};

export const getIfEnrolled = async (courseId, ifEnrolledSaveHandler) => {
  const GET_IF_ENROLLED = `/api/course/enrolledin/${courseId}`;
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
      .catch(err => err)
      .then(data => ifEnrolledSaveHandler(data));
  } catch (err) {
    // This means we are dealing with anonymous user
  }
};
