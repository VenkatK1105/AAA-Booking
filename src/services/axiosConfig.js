import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export const setAuthorization = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.clear();
  }
};

export const setLoggedInUser = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
    localStorage.clear();
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = decodeToken(token);
  const expirationTime = decodedToken.exp * 1000;

  const currentTime = Date.now();
  return expirationTime < currentTime;
};

const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return {};
  }
};

export default api;
