export const giveFeedback = async data => {
  try {
    const URL = "/api/plat/feedback/";
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
      })
      .then(resp => resp);
  } catch (err) {}
};
