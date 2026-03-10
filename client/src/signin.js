import { signin } from "./api/auth";

import notyf from "./UI/notification";

const signInForm = document.querySelector(".form-signIn");

if (localStorage.getItem("logoutSuccess")) {
  notyf.success("Logout successfully!!!");
  localStorage.removeItem("logoutSuccess");
}

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const inputData = Object.fromEntries(formData.entries());

  try {
    const data = await signin(inputData);

    notyf.success("Welcome back!!!");

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("loginSuccess", true);

    //navigate to the dashboard
    window.location.href = "/dashboard.html";
  } catch (error) {
    notyf.error(error.message);
  }
});

