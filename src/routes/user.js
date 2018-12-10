const express = require('express');

const user = require('../controllers/user');
const authCheckMiddleware = require('../middleware/auth-check');

const router = express.Router();

router.post('/login', user.login);

router.post('/register', user.register);

router.get('/user', authCheckMiddleware, user.getAll)

module.exports = router;