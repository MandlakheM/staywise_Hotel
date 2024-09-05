import { configureStore } from "@reduxjs/toolkit";
import accommodationReducer from "../reducers/accommodationReducer";
import { getFirestore } from "firebase/firestore";


const store = configureStore({
  reducer: {
    accommodations: accommodationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { getFirestore },
      },
    }),
});

export default store;
