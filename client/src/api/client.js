const API_BASE = import.meta.env.VITE_API_BASE_URL;

const refreshAccessToken = async function () {
  try {
    const response = await fetch(`${API_BASE}/refresh`, {
      method: "POST",
      credentials: "include"
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error, "refresh post req outcome");
    return false;
  }
};

const apiClient = async function (endpoint, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    window.location.href = "/signin.html";
    //or ask user to login again bc of no credentials
    throw new Error("no access token");
  }

  let response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers
    },
    credentials: "include"
  });

  //handling error during JWT verification
  if (response.status === 401) {
    console.log("token expired, refreshing.........");

    const refreshed = await refreshAccessToken();

    if (refreshed) {
      //make api call again with new token
      const newToken = localStorage.getItem("accessToken");
      response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...options.headers
        },
        credentials: "include"
      });
    } else {
      localStorage.clear();
      window.location.href = "/signin.html";
      throw new Error("session expired");
    }
  }

  return response;
};

export default apiClient;

/*

wrapper

makes api call
- this error could be error from data fetch itself or from verification


first error -> verification access
only then api error

if error -> makes call to refresh end point

once new access token -> makes new api call


*/

