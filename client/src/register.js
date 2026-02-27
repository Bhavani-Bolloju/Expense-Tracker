import { signup } from "./api/auth";
const registerForm = document.querySelector(".form-register");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log("register form");
  const formData = new FormData(e.target);
  const inputData = Object.fromEntries(formData.entries());

  try {
    const data = await signup(inputData);

    window.location.href = "/signin.html";
  } catch (error) {
    console.log(error, "error in catch");
  }
});

