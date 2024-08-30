import accommodationReducer from "./accommodationReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  accommodation: accommodationReducer,
});

export default rootReducer;
