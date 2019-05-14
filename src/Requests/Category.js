import { getAuthorization } from "./Authorization";

const URL = "http://127.0.0.1:8000/api/plat/cat/";

export const getCategoryList = async catSaveHandler => {
  console.log("[Course/Form.js] get categories");
  try {
    await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => catSaveHandler(data));
  } catch (err) {
    console.log("[Course/Form.js] user is not logged in : ", err);
    return [];
  }
};

export const createCategory = async (title, wiki) => {
  console.log("Create category");
  const catData = {
    title: title,
    wiki: wiki
  };
  try {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization()
      },
      body: JSON.stringify(catData)
    })
      .then(response => response.json())
      .then(data => data);
  } catch (err) {
    console.log("Error during category creations");
  }
};
