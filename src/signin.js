const signInForm = document.querySelector(".form-signIn");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const inputData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    //clear form

    // window.location.href = "/dashboard.html";
    console.log(data, "logged in user");
    //save to the local stage

    //navigate to the dashboard
  } catch (error) {
    console.log(error, "error in catch");
  }
});

