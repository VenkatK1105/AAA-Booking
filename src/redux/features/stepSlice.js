import { createSlice } from "@reduxjs/toolkit";
import { fetchPreviewBooking, onUserBooking } from "../../services/bookingServices";

const initialState = {
  step: 1,
  totalSteps: 9,
  formData: {
    booking_date: new Date(),
    booking_time: "",
    pickup_address: {
      address: "",
      place_id: "",
      bedroom: 0,
      bathroom: 0,
      carspaces: 0,
      property_type: "",
      moving_situation: "",
      access_type: [],
      is_stair: false,
      flights: 0,
      truck_distance: ""
    },
    delivery_address: {
      address: "",
      place_id: "",
      bedroom: 0,
      bathroom: 0,
      carspaces: 0,
      property_type: "",
      moving_situation: "",
      access_type: [],
      is_stair: false,
      flights: 0,
      truck_distance: ""
    },
    furnished_type: "",
    is_oversized_furniture: false,
    oversized_furniture: {},
    furniture_disassembly: false,
    additional_comments: "",
  },
  planDetails: {},
  loading: false,
  error: null,
};

export const stepSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    previousStep: (state) => {
      state.step -= 1;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetStep: (state) => {
      state.step = 1;
      state.formData = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onUserBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(onUserBooking.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(onUserBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPreviewBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreviewBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.planDetails = action.payload.data;
      })
      .addCase(fetchPreviewBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

// Action creators are generated for each case reducer function
export const { nextStep, previousStep, updateFormData, resetStep } =
  stepSlice.actions;

export default stepSlice.reducer;

export function getCurrentStep(state) {
  return state.step;
}
