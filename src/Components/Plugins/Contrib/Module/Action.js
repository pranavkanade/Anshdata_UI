const URLS = {
  POST_CREATE_MODULE: "http://127.0.0.1:8000/api/course/mod/"
};

const createModuleHandler = async (onSaveHandler, modData) => {
  console.log("[Module/Action.js] create new module: ", modData);
  try {
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];

    await fetch(URLS.POST_CREATE_MODULE, {
      method: "POST",
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
  } catch (err) {
    console.log("[Module/Action.js] Error when creating a module : ", err);
  }
};

export default createModuleHandler;
