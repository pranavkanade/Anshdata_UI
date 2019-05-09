const URLS = {
  POST_CREATE_LESSON: "http://127.0.0.1:8000/api/course/lsn/"
};

const createLessonHandler = async (onSaveHandler, lsnData) => {
  console.log("[Lesson/Action.js] create new lesson: ", lsnData);

  try {
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];

    await fetch(URLS.POST_CREATE_LESSON, {
      method: "POST",
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
  } catch (err) {
    console.log("[Lesson/Action.js] Error when creating a lesson : ", err);
  }
};

export default createLessonHandler;
