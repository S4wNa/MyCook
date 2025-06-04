const express = require("express");
const router = express.Router();
const { loginUser, SignInUser } = require("../controllers/usersController");

router.post("/login", loginUser);
router.post("/signin", SignInUser);

module.exports = router;
