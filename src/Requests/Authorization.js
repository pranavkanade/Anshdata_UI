import { getUserFromLocalStorage } from "../utils/localStorage";
const URLS = {
  USERSIGNUP: "http://127.0.0.1:8000/api/user/signup/",
  USERLOGIN: "http://127.0.0.1:8000/api/user/login/",
  GETUSER: "http://127.0.0.1:8000/api/user/me/"
};

export const getADUser = () => {
  return getUserFromLocalStorage();
};

export const getAuthToken = () => {
  const adUser = getADUser();
  const token = "";
  return adUser !== null ? adUser.token : token;
};

export const getAuthorization = () => {
  let Authorization = "";
  const AnshdataToken = getAuthToken();
  if (AnshdataToken !== "") {
    Authorization = `JWT ${AnshdataToken}`;
  }
  return Authorization;
};
