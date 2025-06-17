const express = require("express");
const router = express.Router();
const { loginUser, SignUpUser } = require("../controllers/usersController");

router.post("/login", loginUser);
router.post("/signup", SignUpUser);

module.exports = router;
