import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "../booking/bookingSlice";
// import authReducer from '../authSlice/authSlice';


const store = configureStore({
  reducer: {
    // auth: authReducer,
    bookings: bookingsReducer,
  },
});

export default store;


