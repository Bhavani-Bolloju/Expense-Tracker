const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signup = async function (userData) {
  const req = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const res = await req.json();

  if (!req.ok) {
    throw new Error(res.error);
  }

  return res;
};

export const signin = async function (userData) {
  const req = await fetch(`${API_BASE}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData),
    credentials: "include"
  });

  const data = await req.json();

  return data;
};

export const handleLogout = async function (e) {
  try {
    const req = await fetch(`http://localhost:3000/logout`, {
      method: "POST",
      credentials: "include"
    });

    if (!req.ok) {
      throw new Error("logout error");
    }
    localStorage.clear();
    window.location.href = "/signin.html";
  } catch (error) {
    console.log(error);
  }
};

