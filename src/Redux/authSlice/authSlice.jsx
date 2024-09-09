import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const userType = email === "admin@example.com" ? "Admin" : "User";

      return { user, userType };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, userInfo }, thunkAPI) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        ...userInfo,
        timeStamp: new Date(),
      });

      return { ...userInfo, uid: user.uid, userType: userInfo.userType };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userType: null,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userType = null;
      state.isLoggedIn = false;
      localStorage.clear(); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userType = action.payload.userType;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
