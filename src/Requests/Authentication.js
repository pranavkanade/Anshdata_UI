import { getAuthorization } from "./Authorization";

const URLS = {
  USERSIGNUP: "http://127.0.0.1:8000/api/user/signup/",
  USERLOGIN: "http://127.0.0.1:8000/api/user/login/",
  USERLOGOUT: "http://127.0.0.1:8000/api/user/logout/"
};

export const signupHandler = async (event, signupData) => {
  console.log("[Requests/Authentication.js] signUp Data : ", signupData);
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
    console.log("signup sign up response: ", data);
    // remove if any thing is remaining of the previous user
    localStorage.removeItem("AnshdataUser");
    // Following action will automatically store all the data we need.
    localStorage.setItem("AnshdataUser", JSON.stringify(data));
  } catch (err) {
    console.log("[Auth.js] SIGNUP ERR : ", err);
  }
};

export const signinHandler = async (event, signinData) => {
  console.log("[Auth.js] Log In Handler", signinData);
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
    const data = await loginRes.json();
    console.log("signin response: ", data);
    // remove if any thing is remaining of the previous user
    localStorage.removeItem("AnshdataUser");
    // Following action will automatically store all the data we need.
    localStorage.setItem("AnshdataUser", JSON.stringify(data));
  } catch (err) {
    console.log("[Auth.js] SIGNIN ERR : ", err);
  }
};

export const logoutHandler = async event => {
  console.log("[Auth.js] Log Out Handler");
  event.preventDefault();
  try {
    const logoutRes = await fetch(URLS.USERLOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      }
    });
    const data = await logoutRes.json();
    console.log("signout response: ", data);
    // remove if any thing is remaining of the previous user
    localStorage.removeItem("AnshdataUser");
  } catch (err) {
    console.log("[Auth.js] Log out ERR : ", err);
  }
};
