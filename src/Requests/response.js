export default async response => {
  const respData = await response;
  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }
  data = {
    data: data,
    ok: respData.ok,
    status: respData.status,
    statusText: respData.statusText
  };
  return data;
};
