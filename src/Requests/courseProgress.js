import { getAuthorization } from "./Authorization";
import getAdvResponse from "./response";

export const setProgress = async (enrollment_id, data) => {
  const URL = `http://127.0.0.1:8000/api/course/progress/${enrollment_id}/`;
  try {
    let mthd = "PATCH";
    fetch(URL, {
      method: mthd,
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => err)
      .then(data => data);
  } catch (err) {}
};

export const markLessonDone = async data => {
  const URL = `http://127.0.0.1:8000/api/course/progress/done_lsn/`;
  try {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => err)
      .then(data => data);
  } catch (err) {}
};

export const markAssignmentDone = async data => {
  const URL = `http://127.0.0.1:8000/api/course/progress/done_ex/`;
  try {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(err => err)
      .then(data => data);
  } catch (err) {}
};

export const getUserProgress = async () => {
  const URL = "http://127.0.0.1:8000/api/course/enroll/";
  try {
    const resp = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      }
    });
    const advResp = await getAdvResponse(resp);
    return advResp;
  } catch (err) {}
};
