import { getUserFromLocalStorage } from "../utils/localStorage";

export const getADUserInfo = () => {
  try {
    const userData = getUserFromLocalStorage();
    return userData.user;
  } catch {
    console.log("User is not present in local storage");
    return {};
  }
};

export const getADUser = () => {
  return getUserFromLocalStorage();
};

export const getAuthToken = () => {
  const adUser = getUserFromLocalStorage();
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
