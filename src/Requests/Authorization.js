export const getAuthorization = () => {
  const adUser = localStorage.getItem("AnshdataUser");

  let Authorization = "";
  if (adUser !== null) {
    const AnshdataToken = JSON.parse(adUser["token"]);
    Authorization = `JWT ${AnshdataToken}`;
  }

  return Authorization;
};
