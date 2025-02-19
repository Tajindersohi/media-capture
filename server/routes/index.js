const express = require('express');
const mediaRoutes = require('./media'); // Ensure correct path to product.js
const adminRoutes = require('./admin'); // Ensure correct path to auth.js
const { handleUserLogin, createUser, handleGetMe, changePassword } = require('../controllers/auth/auth');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use("/media", authMiddleware ,mediaRoutes);
router.use("/admin", adminRoutes);
router.use("/user/register",createUser);
router.use("/login", handleUserLogin)
router.use("/me",authMiddleware, handleGetMe )
router.use("/change-password",authMiddleware, changePassword )

module.exports = router;
