import { configureStore } from "@reduxjs/toolkit";
import setNotaFiscal from "./slices/setNotaFiscal";

const store = configureStore({ reducer: setNotaFiscal });

export default store
