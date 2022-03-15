import createAsyncSlice from "../helper/createAsyncSlice";
import { API_GET_NF, API_ADD_NF, API_ATT_NF } from "../../API";

const setNotaFiscal = createAsyncSlice({
  name: "setNotaFiscal",
  fetchConfig: (id_user) => API_GET_NF(id_user),
  asyncAdd: (nf) => API_ADD_NF(nf),
  asyncAtt: (nf) => API_ATT_NF(nf),
});

const GET_NF = setNotaFiscal.asyncAction;
const ADD_NF = setNotaFiscal.asyncAdd;
const ATT_NF = setNotaFiscal.asyncAtt;

export const getNF = (id_user) => async (dispatch) => {
  await dispatch(GET_NF(id_user));
};

export const addNF = (nf) => async (dispatch) => {
  await dispatch(ADD_NF(nf));
};

export const attNF = (nf) => async (dispatch) => {
  await dispatch(ATT_NF(nf));
};

export const filterIncompleteNF = ({ setNotaFiscal }) =>
  setNotaFiscal.data?.length &&
  setNotaFiscal.data.filter(({ statusFinal }) => statusFinal !== "Completo");

export const filterCompleteNF = ({ setNotaFiscal }) =>
  setNotaFiscal.data?.length &&
  setNotaFiscal.data.filter(({ statusFinal }) => statusFinal === "Completo");

export default setNotaFiscal.reducer;
