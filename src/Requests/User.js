import { getAuthorization } from "./Authorization";

export const getUserDetails = async (userName, userSaveHandler) => {
  const URL = `http://127.0.0.1:8000/api/user/${userName}/`;
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
    console.log("get User Detail", err);
  }
};
