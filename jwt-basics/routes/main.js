const express = require('express')
const { login, dashboard } = require('../controllers/main');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login)

module.exports = router