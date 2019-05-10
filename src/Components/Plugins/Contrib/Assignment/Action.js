import Router from "next/router";

const createAssignmentHandler = async (
  onSaveHandler,
  assignmentData,
  exId
) => {
  console.log(
    "[Assignment/Action.js] create new assignment: ",
    assignmentData
  );

  try {
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];
    let mthd = "POST";
    let URL = "http://127.0.0.1:8000/api/course/ex/";
    if (exId !== null) {
      mthd = "PATCH";
      URL = `http://127.0.0.1:8000/api/course/ex/${exId}/`;
    }

    await fetch(URL, {
      method: mthd,
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
    const page = window.location.pathname;

    Router.push(page);
  } catch (err) {
    console.log(
      "[Assignment/Action.js] Error when creating an assignment : ",
      err
    );
  }
};

export default createAssignmentHandler;
