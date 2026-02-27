import { signin } from "./api/auth";

const signInForm = document.querySelector(".form-signIn");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const inputData = Object.fromEntries(formData.entries());

  try {
    const data = await signin(inputData);

    //store token and the user details to the local storage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    //navigate to the dashboard
    window.location.href = "/dashboard.html";
  } catch (error) {
    console.log(error, "error in catch");
  }
});

