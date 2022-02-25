import { createSlice } from "@reduxjs/toolkit";
import data from "../helper/data";
const slice = createSlice({
  name: "setNotaFiscal",
  initialState: {
    data,
    completeList: data,
  },
  reducers: {
    setNfItem(state, action) {
      state.data.unshift(action.payload);
    },
    editNfItem(state, action) {
      for (let i in state.data) {
        if (state.data[i].id === action.payload.id) {
          state.data[i].tipoNF = action.payload.tipoNF;
          state.data[i].residuo = action.payload.residuo;
          state.data[i].nfCliente = action.payload.nfCliente;
          state.data[i].nfGri = action.payload.nfGri;
          state.data[i].processo = action.payload.processo;
          state.data[i].statusNF = action.payload.statusNF;
          state.data[i].statusBoleto = action.payload.statusBoleto;
        }
      }
    },
    deleteNfItem(state, action) {
      const nfs = state.data.filter((nf) => nf.id !== action.payload);
      return { data: nfs, completeList: state.completeList };
    },
    finalizeNfItem(state, action) {
      const nf = state.data.filter((nf) => nf.id === action.payload);

      return void ({ nf: (nf[0].statusNF = "Enviado") },
      { nf: (nf[0].statusBoleto = "Enviado") },
      { statusFinal: (nf[0].statusFinal = "Completo") });
    },
    setCompletList(state, action) {
      const nf = state.data.filter(
        (nf) => nf.id === action.payload || action.payload.id
      );
      state.completeList.unshift(...nf);
    },
  },
});

export const {
  setNfItem,
  editNfItem,
  deleteNfItem,
  finalizeNfItem,
  setCompletList,
} = slice.actions;

export const nfSet = (payload) => (dispatch) => {
  if (payload.statusFinal === "Completo") {
    dispatch(setCompletList(payload));
    dispatch(deleteNfItem(payload.id));
  } else {
    dispatch(setNfItem(payload));
  }
};

export const nfEditSet = (payload) => (dispatch) => {
  if (payload.statusFinal === "Completo") {
    dispatch(editNfItem(payload));
    dispatch(setCompletList(payload));
    dispatch(deleteNfItem(payload.id));
  } else {
    dispatch(editNfItem(payload));
  }
};

export const nfFinalizeSet = (payload) => (dispatch) => {
  dispatch(finalizeNfItem(payload));
  dispatch(setCompletList(payload));
  dispatch(deleteNfItem(payload));
};

export default slice.reducer;
