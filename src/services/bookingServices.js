import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosConfig";
import axios from "axios";

// Async thunk for adding a new todo
export const fetchAppData = createAsyncThunk(
  "aaa/appData",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.get("/application-data");
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const onUserBooking = createAsyncThunk(
  "aaa/booking",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post("/booking", data);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPreviewBooking = createAsyncThunk(
  "aaa/plan-calculation",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await api.post("/booking-calculation", data);
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getGReviewData = async () => {
  try {
    const placeID =
      "EjF1bml0IDEwLzEgQWRlcHQgTG4sIEJhbmtzdG93biBOU1cgMjIwMCwgQXVzdHJhbGlhIiMaIQoWChQKEglD3iC6qL4SaxETQOaZfu-RsRIHdW5pdCAxMA";
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_SECRET;
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.status === 200) {
      const reviews = response.data.result.reviews;
      console.log(reviews); // Process the reviews data here
    } else {
      console.error(
        "Error fetching data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
