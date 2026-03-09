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

    notyf.success("User registered");

    setTimeout(() => {
      window.location.href = "/signin.html";
    }, 1500);
  } catch (error) {
    notyf.error(error.message);
  }
});

