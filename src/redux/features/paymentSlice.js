import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    clientId: "YOUR_PAYPAL_CLIENT_ID",
    status: "idle", // 'idle' | 'success' | 'error'
  },
  reducers: {
    updatePaymentStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { updatePaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
