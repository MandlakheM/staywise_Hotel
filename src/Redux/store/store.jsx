import accommodationReducer from "../reducers/accommodationReducer";
import authReducer from "../reducers/authReducer";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  accommodation: accommodationReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
