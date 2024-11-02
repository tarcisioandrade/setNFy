const mysql = require("../mysql");
const regexp = /\B(?=(\d{3})+(?!\d))/g;

function formatProcess(process) {
  if (process !== null) {
    return process.toString().replace(/\./g, "").replace(regexp, ".");
  } else {
    return null;
  }
}

exports.postNF = async (req, res) => {
  try {
    const query =
      "INSERT INTO tb_notas_fiscais ( tb_user_usr_id, nfs_id, nfs_type, nfs_residuo, nfs_nfClient, nfs_nfGri, nfs_processo, nfs_statusNF, nfs_statusBoleto, nfs_statusFinal) VALUES (?,?,?,?,?,?,?,?,?,?)";

    await mysql.execute(query, [
      req.body.id_user,
      req.body.nf_id,
      req.body.type,
      req.body.residuo,
      req.body.nfClient,
      req.body.nfGri,
      req.body.processo,
      req.body.statusNF,
      req.body.statusBoleto,
      req.body.statusFinal,
    ]);
    const response = {
      ok: true,
      message: "Nota Fiscal inserida com sucesso!",
      nota_fiscal: {
        type: req.body.type,
        residuo: req.body.residuo,
        nfClient: req.body.nfClient,
        nfGri: req.body.nfGri,
        processo: req.body.processo,
        statusNF: req.body.statusNF,
        statusBoleto: req.body.statusBoleto,
        statusFinal: req.body.statusFinal,
      },
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.getNF = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_notas_fiscais WHERE tb_user_usr_id = ?";
    const results = await mysql.execute(query, [req.body.id_user]);
    if (results.length < 1) {
      return res.status(404).send({
        ok: false,
        message: "User ID data not found",
      });
    }
    const response = results.map((nf) => {
      return {
        id_user: nf.tb_user_usr_id,
        nf_id: nf.nfs_id,
        type: nf.nfs_type,
        residuo: nf.nfs_residuo,
        nfClient: nf.nfs_nfClient,
        nfGri: nf.nfs_nfGri,
        processo: formatProcess(nf.nfs_processo) || null,
        statusNF: nf.nfs_statusNF,
        statusBoleto: nf.nfs_statusBoleto,
        statusFinal: nf.nfs_statusFinal,
      };
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.getNFwithID = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_notas_fiscais WHERE tb_user_usr_id = ?";
    const results = await mysql.execute(query, [req.params.id_user]);
    if (results.length < 1) {
      return res.status(404).send({
        ok: false,
        message: "User ID data not found",
      });
    }
    const response = results.map((nf) => {
      return {
        id_user: nf.tb_user_usr_id,
        nf_id: nf.nfs_id,
        type: nf.nfs_type,
        residuo: nf.nfs_residuo,
        nfClient: nf.nfs_nfClient,
        nfGri: nf.nfs_nfGri,
        processo: formatProcess(nf.nfs_processo),
        statusNF: nf.nfs_statusNF,
        statusBoleto: nf.nfs_statusBoleto,
        statusFinal: nf.nfs_statusFinal,
      };
    });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.deleteNF = async (req, res) => {
  try {
    const query = "DELETE FROM tb_notas_fiscais WHERE nfs_id = ?";
    await mysql.execute(query, [req.body.nf_id]);
    const response = {
      ok: true,
      message: "Nota Fiscal deletada com sucesso!",
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.updateNF = async (req, res) => {
  try {
    const query =
      "UPDATE tb_notas_fiscais SET nfs_type = ?, nfs_residuo = ?, nfs_nfClient = ?, nfs_nfGri = ?, nfs_processo = ?, nfs_statusNF = ?, nfs_statusBoleto = ?, nfs_statusFinal = ? WHERE nfs_id = ?";
    await mysql.execute(query, [
      req.body.type,
      req.body.residuo,
      req.body.nfClient,
      req.body.nfGri,
      req.body.processo,
      req.body.statusNF,
      req.body.statusBoleto,
      req.body.statusFinal,
      req.body.nf_id,
    ]);
    const response = {
      ok: true,
      message: "Nota Fiscal atualizada com sucesso!",
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.finalizeNF = async (req, res) => {
  try {
    const query = `UPDATE tb_notas_fiscais SET nfs_statusNF = "Enviado", nfs_statusBoleto = "Enviado", nfs_statusFinal = "Completo" WHERE nfs_id = ?;`;
    await mysql.execute(query, req.body.nf_id);
    const response = {
      ok: true,
      message: "Nota fiscal finalizada.",
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};
