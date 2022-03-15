import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setUser from "./slices/setUser";
import setNotaFiscal from "./slices/setNotaFiscal";

const reducer = combineReducers({ setNotaFiscal, setUser });
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(setLocalStorage),
});

export default store;
