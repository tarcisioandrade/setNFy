export const authProcesso = (processo) => {
  if (processo === "") {
    return null;
  } else if (processo == null) {
    return null;
  } else {
    return processo.toString().replace(/\./g, "");
  }
};

export const authNfGri = (nfGri) => {
  if (nfGri === "") {
    return null;
  } else if (nfGri == null) {
    return null;
  } else {
    return Number(nfGri);
  }
};

export const authStatusFinal = (statusNF, statusBoleto) => {
  if (statusNF === "Enviado" && statusBoleto === "Enviado") {
    return "Completo";
  } else {
    return "Incompleto";
  }
};
