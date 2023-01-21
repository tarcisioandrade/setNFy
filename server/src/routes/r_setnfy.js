const express = require("express");
const router = express.Router();

const SetNFyControllers = require("../controllers/c_setnfy");

router.post("/add", SetNFyControllers.postNF);
router.get("/get", SetNFyControllers.getNF);
router.get("/get=:id_user", SetNFyControllers.getNFwithID);
router.delete("/del", SetNFyControllers.deleteNF);
router.patch("/att", SetNFyControllers.updateNF);
router.patch("/fin", SetNFyControllers.finalizeNF);


module.exports = router;
