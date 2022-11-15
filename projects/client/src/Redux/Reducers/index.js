import user from "./user";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
