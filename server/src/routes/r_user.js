const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/c_user");

router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);
router.post("/token", UserControllers.loginToken);
router.post("/forgot", UserControllers.sendResetLink);
router.post("/reset_password/:token", UserControllers.resetPassword);

module.exports = router;
