import { DEL_NF, FIN_NF } from "../../API";
import createAsyncSlice from "../helper/createAsyncSlice";

const setNotaFiscal = createAsyncSlice({
  name: "setNotaFiscal",
  fetchConfig: (id_user) => ({
    url: `https://setnfy-api.herokuapp.com/api/get=${id_user}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  }),
  asyncAdd: (nf) => ({
    url: `https://setnfy-api.herokuapp.com/api/add`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nf),
    },
  }),
  asyncAtt: (nf) => ({
    url: `https://setnfy-api.herokuapp.com/api/att`,
    options: {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nf),
    },
  }),
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

export const delNF = (nf_id) => async () => {
  await DEL_NF(nf_id);
};

export const finalizeNF = (nf_id) => async () => {
  await FIN_NF(nf_id);
};

export default setNotaFiscal.reducer;
