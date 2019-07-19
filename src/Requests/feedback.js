export const giveFeedback = async data => {
  try {
    const URL = "http://127.0.0.1:8000/api/plat/feedback/";
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
  } catch (err) {
    console.log("Error when giving feedback to a course : ", err);
  }
};
