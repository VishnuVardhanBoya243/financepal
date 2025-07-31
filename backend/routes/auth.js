const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Optional test route
router.get('/me', protect, (req, res) => {
  res.json({ message: 'Protected route accessed!', userId: req.user.id });
});

module.exports = router;

