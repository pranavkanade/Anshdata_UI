import Router from "next/router";
const createModuleHandler = async (onSaveHandler, modData, modId) => {
  console.log("[Module/Action.js] create new module: ", modData);
  try {
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];

    let mthd = "POST";
    let URL = "http://127.0.0.1:8000/api/course/mod/";
    if (modId !== null) {
      mthd = "PATCH";
      URL = `http://127.0.0.1:8000/api/course/mod/${modId}/`;
    }

    await fetch(URL, {
      method: mthd,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${AnshdataToken}`
      },
      body: JSON.stringify(modData)
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log("Module Created ", data);
        onSaveHandler(data.id);
      });
    const page = window.location.pathname;

    Router.push(page);
  } catch (err) {
    console.log("[Module/Action.js] Error when creating a module : ", err);
  }
};

export default createModuleHandler;
