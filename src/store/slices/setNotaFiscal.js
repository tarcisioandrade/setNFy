import { createSlice } from "@reduxjs/toolkit";
import data from "../helper/data";

const slice = createSlice({
  name: "setNotaFiscal",
  initialState: data,
  completeList: [],
  reducers: {
    setNfItem(state, action) {
      state.unshift(action.payload);
    },
    editNfItem(state, action) {
      for (let i in state) {
        if (state[i].id === action.payload.id) {
          state[i].tipoNF = action.payload.tipoNF;
          state[i].residuo = action.payload.residuo;
          state[i].nfCliente = action.payload.nfCliente;
          state[i].nfGri = action.payload.nfGri;
          state[i].processo = action.payload.processo;
          state[i].statusNF = action.payload.statusNF;
          state[i].statusBoleto = action.payload.statusBoleto;
        }
      }
    },
    deleteNfItem(state, action) {
      const nfs = state.filter((nf) => nf.id !== action.payload);
      return nfs;
    },
    finalizeNfItem(state, action) {
      const nf = state.filter((nf) => nf.id === action.payload);

      return void ({ nf: (nf[0].statusNF = "Enviado") },
      { nf: (nf[0].statusBoleto = "Enviado") },
      { statusFinal: (nf[0].statusFinal = "Completo") });
    },
    setCompletList(state) {
      const nfsCompletas = state.filter((nf) => nf.statusFinal === "Completo");
      state.completeList.push(nfsCompletas);
    },
  },
});

export const { setNfItem, editNfItem, deleteNfItem, finalizeNfItem } =
  slice.actions;
export default slice.reducer;
