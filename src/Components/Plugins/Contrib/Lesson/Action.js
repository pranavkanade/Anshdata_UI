import Router from "next/router";

const createLessonHandler = async (onSaveHandler, lsnData, lsnId) => {
  console.log("[Lesson/Action.js] create new lesson: ", lsnData);

  try {
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];
    let mthd = "POST";
    let URL = "http://127.0.0.1:8000/api/course/lsn/";
    if (lsnId !== null) {
      mthd = "PATCH";
      URL = `http://127.0.0.1:8000/api/course/lsn/${lsnId}/`;
    }

    await fetch(URL, {
      method: mthd,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${AnshdataToken}`
      },
      body: JSON.stringify(lsnData)
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log("Lesson Created ", data);
        onSaveHandler(data.id);
      });
    const page = window.location.pathname;

    Router.push(page);
  } catch (err) {
    console.log("[Lesson/Action.js] Error when creating a lesson : ", err);
  }
};

export default createLessonHandler;
