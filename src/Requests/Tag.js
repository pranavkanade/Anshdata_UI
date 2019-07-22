import { getAuthorization } from "./Authorization";

const URL = "http://127.0.0.1:8000/api/plat/tag/";

export const getTagList = async tagsSaveHandler => {
  try {
    await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => tagsSaveHandler(data));
  } catch (err) {
    return [];
  }
};

export const createTag = async (title, wiki) => {
  const tagData = {
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
      body: JSON.stringify(tagData)
    })
      .then(response => response.json())
      .then(data => data);
  } catch (err) {}
};
