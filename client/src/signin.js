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
      body: JSON.stringify(inputData),
      credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log(data, "after login user client");

    //store token and the user details to the local storage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    //navigate to the dashboard
    window.location.href = "/dashboard.html";
  } catch (error) {
    console.log(error, "error in catch");
  }
});
