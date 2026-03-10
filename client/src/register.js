import { signup } from "./api/auth";

import notyf from "./UI/notification";

const registerForm = document.querySelector(".form-register");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log("register form");
  const formData = new FormData(e.target);
  const inputData = Object.fromEntries(formData.entries());

  try {
    await signup(inputData);

    window.location.href = "/signin.html";
  } catch (error) {
    notyf.error(error.message);
  }
});

