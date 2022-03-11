import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setLocalStorage from "./middlewares/setLocalStorage";
import setUser from "./slices/setUser";
import SetNotaFiscal from "./slices/SetNotaFiscal";

const reducer = combineReducers({ SetNotaFiscal, setUser });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setLocalStorage),
});

export default store;
