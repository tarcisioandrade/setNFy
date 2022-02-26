import generateID from "./generateID";

const data = [
  {
    id: generateID(),
    tipoNF: "Complementar",
    residuo: "Sucata Metálica",
    nfCliente: 55172,
    nfGri: 5837,
    processo: 151.235,
    statusNF: "Pendente",
    statusBoleto: "Pendente",
    statusFinal: "Completo"
  },
  {
    id: generateID(),
    tipoNF: "Venda",
    residuo: "Tambores",
    nfCliente: 48787,
    nfGri: 5864,
    processo: 153.591,
    statusNF: "Pendente",
    statusBoleto: "Pendente",
    statusFinal: "Completo"
  },
  {
    id: generateID(),
    tipoNF: "Venda",
    residuo: "Papelão",
    nfCliente: 48174,
    nfGri: 5239,
    processo: 151.772,
    statusNF: "Pendente",
    statusBoleto: "Pendente",
    statusFinal: "Completo"
  },
  {
    id: generateID(),
    tipoNF: "Venda",
    residuo: "Plástico Duro Placas",
    nfCliente: 12347,
    nfGri: 6899,
    processo: 151.345,
    statusNF: "Pendente",
    statusBoleto: "Pendente",
    statusFinal: "Completo"
  },
  {
    id: generateID(),
    tipoNF: "Complementar",
    residuo: "Papelão Misto",
    nfCliente: 56987,
    nfGri: 5444,
    processo: 121.235,
    statusNF: "Pendente",
    statusBoleto: "Pendente",
    statusFinal: "Completo"
  },
  {
    id: generateID(),
    tipoNF: "Complementar",
    residuo: "Plástico Duro Embalagens",
    nfCliente: 48110,
    nfGri: 6564,
    processo: 153.586,
    statusNF: "Pendente",
    statusBoleto: "Pendente",
    statusFinal: "Completo"
  },
];

export default data;
