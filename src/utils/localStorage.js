export const getUserFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("AD_USER");
    return JSON.parse(data);
  } catch (err) {
    console.log("Error during fetching the data from localstorage : ", err);
  }
  return undefined;
};

export const setUserToLocalStorage = data => {
  try {
    data = JSON.stringify(data);
    localStorage.setItem("AD_USER", data);
  } catch (err) {
    console.log("Error during updating the local storage state : ", err);
  }
};

export const removeUserFromLocalStorage = () => {
  try {
    localStorage.removeItem("AD_USER");
  } catch (err) {
    console.log("Error during fetching the data from localstorage : ", err);
  }
};
