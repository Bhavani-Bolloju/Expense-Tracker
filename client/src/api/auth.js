const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signup = async function (userData) {
  const req = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!req.ok) {
    const error = await req.json();
    throw new Error(error.error || "Failed to register, try again!!");
  }
  const res = await req.json();
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

  if (!req.ok) {
    const error = await req.json();
    throw new Error(error.error || "Failed to login!!");
  }
  const data = await req.json();
  return data;
};

export const logout = async function (e) {
  const req = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include"
  });

  console.log(req, "client logout req response");

  if (!req.ok) {
    const error = await req.json();
    throw new Error(error.error || "logout error");
  }
  localStorage.clear();
  const res = await req.json();
  return res;
};

