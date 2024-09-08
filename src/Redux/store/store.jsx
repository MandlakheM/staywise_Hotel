import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../booking/bookingSlice";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

export default store;
