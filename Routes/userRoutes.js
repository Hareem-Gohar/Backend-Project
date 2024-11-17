const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../Controllers/UserController');
const router = express.Router();

router.get('/', getAllUsers)
router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
