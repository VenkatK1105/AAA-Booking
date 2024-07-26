import { createSlice } from "@reduxjs/toolkit";
import { fetchAppData } from "../../services/bookingServices";

const initialState = {
  isDarkTheme: false,
  appData: null,
  isDataFetched: false,
  isLoading: false,
  error: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAppData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appData = action.payload.data;
        state.isDataFetched = true;
      })
      .addCase(fetchAppData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
