/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { setAuthorization } from "../../services/axiosConfig";
import { onLogIn, onSiginUp } from "../../services/AuthService";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null,
  token: localStorage.getItem("token") || "",
  isLoggedIn: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

if (initialState.token) {
  setAuthorization(initialState.token);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      setAuthorization(action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthorization(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(onLogIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("token", action.payload.token);
        setAuthorization(action.payload.token);
      })
      .addCase(onLogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(onSiginUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(onSiginUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(onSiginUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
