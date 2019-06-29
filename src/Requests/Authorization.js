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
  }
};

export const signupHandler = async (event, signupData, signinData) => {
  console.log("[Auth.js] Sign Up Handler");
  event.preventDefault();
  try {
    console.log("[Auth.js] : Sign Up Data", signupData);
    const siginupRes = await fetch(URLS.USERSIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupData)
    });
    const data = await siginupRes.json();
    console.log("signup data : ", data);
    localStorage.setItem("AnshdataUser", JSON.stringify(data));
  } catch (err) {
    console.log("[Auth.js] SIGNUP ERR : ", err);
    return;
  }

  try {
    console.log("[Auth.js] Sign In Data", signinData);
    const loginRes = await fetch(URLS.USERLOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signinData)
    });
    let AnshdataUser = JSON.parse(getADUser());
    AnshdataUser["token"] = (await loginRes.json()).token;
    localStorage.setItem("AnshdataUser", JSON.stringify(AnshdataUser));
  } catch (err) {
    console.log("[Auth.js] SIGNIN ERR : ", err);
  }
  Router.push("/");
};

export const signinHandler = async (event, signinData) => {
  console.log("[Auth.js] Log In Handler");
  event.preventDefault();
  try {
    console.log("[Auth] : Sign In Handler", signinData);
    const loginRes = await fetch(URLS.USERLOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signinData)
    });

    let AnshdataToken = (await loginRes.json()).token;
    const userRes = await fetch(URLS.GETUSER, {
      headers: {
        Authorization: `JWT ${AnshdataToken}`
      }
    });
    // NOTE: Here assume no error will occur
    // we get list so ..
    let AnshdataUser = (await userRes.json())[0];
    AnshdataUser["token"] = AnshdataToken;
    localStorage.setItem("AnshdataUser", JSON.stringify(AnshdataUser));
  } catch (err) {
    console.log("[Auth.js] SIGNIN ERR : ", err);
  }
  Router.push("/");
};
