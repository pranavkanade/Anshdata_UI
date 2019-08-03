export const getUserFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("AD_USER");
    return JSON.parse(data);
  } catch (err) {}
  return undefined;
};

export const setUserToLocalStorage = data => {
  try {
    data = JSON.stringify(data);
    localStorage.setItem("AD_USER", data);
  } catch (err) {}
};

export const removeUserFromLocalStorage = () => {
  try {
    localStorage.removeItem("AD_USER");
  } catch (err) {}
};

const __AD_STORE__ = "__AD_STORE__";

export const getADStateFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(__AD_STORE__);
    return JSON.parse(data);
  } catch (err) {}
  return undefined;
};

export const setADStateToLocalStorage = data => {
  try {
    const storedState = getADStateFromLocalStorage();
    data = {
      ...storedState,
      ...data
    };
    data = JSON.stringify(data);
    localStorage.setItem(__AD_STORE__, data);
  } catch (err) {}
};

export const removeADStateFromLocalStorage = () => {
  try {
    localStorage.removeItem(__AD_STORE__);
  } catch (err) {}
};
