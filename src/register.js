const registerForm = document.querySelector(".form-register");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log("register form");
  const formData = new FormData(e.target);
  const inputData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`http://localhost:3000/register`, {
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
    
    window.location.href = "/signin.html";


  } catch (error) {
    console.log(error, "error in catch");
  }
});

