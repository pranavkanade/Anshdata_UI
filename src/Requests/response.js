export default async response => {
  const respData = await response;
  let data = await response.json();
  data = {
    data: data,
    ok: respData.ok,
    status: respData.status,
    statusText: respData.statusText
  };
  return data;
};
