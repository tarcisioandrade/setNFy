import { ADD_NF, ATT_NF, DEL_NF, FIN_NF } from "../../API";
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
});
const fetchNF = setNotaFiscal.asyncAction;

export const getNF = (id_user) => async (dispatch) => {
  await dispatch(fetchNF(id_user));
};

export const addNF = (nf) => async () => {
  await ADD_NF(nf);
};

export const attNF = (nf) => async () => {
  await ATT_NF(nf);
};

export const delNF = (nf_id) => async () => {
  await DEL_NF(nf_id);
};

export const finalizeNF = (nf_id) => async () => {
  await FIN_NF(nf_id);
};

export default setNotaFiscal.reducer;
