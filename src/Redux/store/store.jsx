import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, compose } from "redux";
import logger from "redux-logger";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import accommodationReducer from "../reducers/accommodationReducer";
import authReducer from "../reducers/authReducer";
import firebaseConfig from "../../config/firebase"; 

const rootReducer = combineReducers({
  auth: authReducer,
  accommodation: accommodationReducer,
});

const enhancers = compose(
  reduxFirestore(firebaseConfig),
  reactReduxFirebase(firebaseConfig, { attachAuthIsReady: true })
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { getFirebase, getFirestore },
      },
    }).concat(logger),
  enhancers: [enhancers],
});

export default store;
