import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setLocalStorage from "./middlewares/setLocalStorage";
import setNotaFiscal from "./slices/setNotaFiscal";
import setUser from "./slices/setUser";

const reducer = combineReducers({ setNotaFiscal, setUser });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setLocalStorage),
});

export default store;
