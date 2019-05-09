const URLS = {
  POST_CREATE_ASSIGNMENT: "http://127.0.0.1:8000/api/course/ex/"
};

const createAssignmentHandler = async (onSaveHandler, assignmentData) => {
  console.log(
    "[Assignment/Action.js] create new assignment: ",
    assignmentData
  );

  try {
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];

    await fetch(URLS.POST_CREATE_ASSIGNMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${AnshdataToken}`
      },
      body: JSON.stringify(assignmentData)
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log("Assignment Created ", data);
        onSaveHandler(data.id);
      });
  } catch (err) {
    console.log(
      "[Assignment/Action.js] Error when creating an assignment : ",
      err
    );
  }
};

export default createAssignmentHandler;
