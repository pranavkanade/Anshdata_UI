import { getAuthorization, getAuthToken } from "./Authorization";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
  removeUserFromLocalStorage
} from "./../utils/localStorage";
import buildCustomResponse from "./response";

const URLS = {
  USERSIGNUP: "http://127.0.0.1:8000/api/user/signup/",
  USERLOGIN: "http://127.0.0.1:8000/api/user/login/",
  USERLOGOUT: "http://127.0.0.1:8000/api/user/logout/"
};

export const signupHandler = async signupData => {
  try {
    const siginupRes = await fetch(URLS.USERSIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupData)
    });
    const data = await siginupRes.json();
    // remove if any thing is remaining of the previous user
    removeUserFromLocalStorage();
    // Following action will automatically store all the data we need.
    setUserToLocalStorage(data);
    return data;
  } catch (err) {}
};

export const signinHandler = async signinData => {
  try {
    const loginRes = await fetch(URLS.USERLOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signinData)
    });
    // remove if any thing is remaining of the previous user
    removeUserFromLocalStorage();
    // Following action will automatically store all the data we need.
    const dataWithError = await buildCustomResponse(loginRes);
    setUserToLocalStorage(dataWithError.data);
    return dataWithError;
  } catch (err) {}
};

export const logoutHandler = async event => {
  try {
    const logoutRes = await fetch(URLS.USERLOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      }
    });
    const data = await logoutRes.json();
    // remove if any thing is remaining of the previous user
    removeUserFromLocalStorage();
  } catch (err) {}
};

export const refreshUserToken = async () => {
  const URL = "http://127.0.0.1:8000/api/user/refresh/";
  try {
    const adToken = getAuthToken();
    if (adToken === "" || adToken === null) {
      return;
    }
    const refreshData = {
      token: adToken
    };
    const refreshRes = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(refreshData)
    });

    let AnshdataToken = (await refreshRes.json()).token;
    let AnshdataUser = getUserFromLocalStorage();
    AnshdataUser["token"] = AnshdataToken;
    removeUserFromLocalStorage();
    setUserToLocalStorage(AnshdataUser);
  } catch (err) {
    removeUserFromLocalStorage();
  }
};

export const verifyUserToken = async () => {
  const URL = "http://127.0.0.1:8000/api/user/verify/";
  try {
    const adToken = getAuthToken();
    if (adToken === "" || adToken === null || typeof adToken !== "string") {
      return;
    }
    const refreshData = {
      token: adToken
    };
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(refreshData)
    });

    const data = await buildCustomResponse(response);
    return data;
  } catch (err) {
    return err;
  }
};
