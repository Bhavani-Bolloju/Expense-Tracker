import { signin } from "./api/auth";

import notyf from "./UI/notification";

const signInForm = document.querySelector(".form-signIn");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const inputData = Object.fromEntries(formData.entries());

  try {
    const data = await signin(inputData);

    notyf.success("Welcome back!!!");

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    //navigate to the dashboard
    setTimeout(() => {
      window.location.href = "/dashboard.html";
    }, 1500);
  } catch (error) {
    notyf.error(error.message);
  }
});

