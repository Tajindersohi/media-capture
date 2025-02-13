const express = require('express');
const router = express.Router();
const { handleUserLogin,createUser } = require('../controllers/auth/auth');

router.post("/login", handleUserLogin);
router.post("/register", createUser);

module.exports = router;
