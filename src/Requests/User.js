import { getAuthorization } from "./Authorization";

export const getUserDetails = async (userName, userSaveHandler) => {
  const URL = `/api/user/${userName}/`;
  try {
    await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      }
    })
      .then(response => response.json())
      .then(data => userSaveHandler(data[0]));
  } catch (err) {
  }
};
