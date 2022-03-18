import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setUser from "./slices/setUser";
import setToken from "./slices/setToken";
import setNotaFiscal from "./slices/setNotaFiscal";

const reducer = combineReducers({ setNotaFiscal, setUser, setToken });
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(setLocalStorage),
});

export default store;
