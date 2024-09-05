// src/redux/slices/accommodationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore } from "firebase/firestore";

// Async Thunks
export const createAccommodation = createAsyncThunk(
  "accommodations/createAccommodation",
  async (accom, { rejectWithValue }) => {
    try {
      const firestore = getFirestore();
      await firestore.collection("accommodationList").add({
        ...accom,
        creator: "me", 
        createdAt: new Date(),
      });
      return accom;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const accommodationSlice = createSlice({
  name: "accommodations",
  initialState: {
    places: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccommodation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAccommodation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.places.push(action.payload);
      })
      .addCase(createAccommodation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default accommodationSlice.reducer;
