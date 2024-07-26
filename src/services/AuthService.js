import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosConfig";

// Async thunk for adding a new todo
export const onLogIn = createAsyncThunk(
  "aaa/login",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post("/login", data);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onSiginUp = createAsyncThunk(
  "aaa/register",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post("/register", data);
      return fulfillWithValue(res.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
