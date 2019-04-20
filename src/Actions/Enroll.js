import Router from "next/router";

const URLS = {
  PATCH_COURSE_ENROLL: "http://127.0.0.1:8000/api/course/enroll/"
};

const enrollEventHandler = async courseKey => {
  console.log("[Actions/Enroll.js] enroll in a course: ", courseKey);
  try {
    const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
      "token"
    ];
    const enrollmentData = {
      course: String(courseKey)
    };
    // console.log("URL", URLS.PATCH_COURSE_ENROLL);
    await fetch(URLS.PATCH_COURSE_ENROLL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${AnshdataToken}`
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

  Router.push("/courses");
};

export default enrollEventHandler;
