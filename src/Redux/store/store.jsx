import accommodationReducer from "../reducers/accommodationReducer";
import authReducer from "../reducers/authReducer";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  auth: authReducer,
  accommodation: accommodationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});

export default store;
