import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const initialState = {
  bookings: [],
  favorites: [],
  status: 'idle', 
  error: null,
};

export const makeBooking = createAsyncThunk(
  'booking/makeBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await addDoc(collection(db, 'bookings'), bookingData);
      return { ...bookingData, id: response.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  'booking/fetchBookings',
  async (userId, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return bookings.filter((booking) => booking.userId === userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'booking/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, 'favorites'));
      const favorites = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return favorites.filter((favorite) => favorite.userId === userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(makeBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings.push(action.payload);
      })
      .addCase(makeBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
