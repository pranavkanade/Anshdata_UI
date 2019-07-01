import Router from "next/router";
const URLS = {
  USERSIGNUP: "http://127.0.0.1:8000/api/user/signup/",
  USERLOGIN: "http://127.0.0.1:8000/api/user/login/",
  GETUSER: "http://127.0.0.1:8000/api/user/me/"
};

export const getADUser = () => {
  return localStorage.getItem("AnshdataUser");
};

export const getADUserJson = () => {
  return JSON.parse(getADUser());
};

export const getAuthToken = () => {
  const adUser = getADUser();
  const token = "";
  return adUser !== null ? JSON.parse(adUser)["token"] : token;
};

export const getAuthorization = () => {
  let Authorization = "";
  const AnshdataToken = getAuthToken();
  if (AnshdataToken !== "") {
    Authorization = `JWT ${AnshdataToken}`;
  }
  return Authorization;
};

export const refreshUserToken = async () => {
  console.log("[Authorization.js] Refresh Handler");
  const URL = "http://127.0.0.1:8000/api/user/refresh/";
  try {
    const adToken = getAuthToken();
    if (adToken === "") {
      return;
    }
    const refreshData = {
      token: adToken
    };
    // console.log("[Authorization.js] : Refresh Handler", refreshData);
    const refreshRes = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(refreshData)
    });

    let AnshdataToken = (await refreshRes.json()).token;
    let AnshdataUser = JSON.parse(getADUser());
    AnshdataUser["token"] = AnshdataToken;
    localStorage.removeItem("AnshdataUser");
    localStorage.setItem("AnshdataUser", JSON.stringify(AnshdataUser));
    console.log("[Authorization.js] Refreshed token");
  } catch (err) {
    console.log("[Authorization.js] Refresh ERR : ", err);
    localStorage.removeItem("AnshdataUser");
  }
};
