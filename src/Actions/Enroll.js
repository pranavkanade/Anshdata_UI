import Router from "next/router";

const URLS = {
  PATCH_COURSE_ENROLL: "http://127.0.0.1:8000/api/course"
};

// http://127.0.0.1:8000/api/course/10/enroll/

const enrollEventHandler = async courseKey => {
  console.log("[Actions/Enroll.js] enroll in a course: ", courseKey);
  const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
    "token"
  ];
  const URL = URLS.PATCH_COURSE_ENROLL + "/" + courseKey + "/enroll/";
  console.log("URL", URL);
  await fetch(URL, {
    method: "PATCH",
    headers: {
      Authorization: `JWT ${AnshdataToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log("Enrolled into ", data);
    });

  Router.push("/courses");
};

export default enrollEventHandler;
