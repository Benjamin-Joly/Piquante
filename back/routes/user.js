const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const User = require('../models/User');

router.use(express.json());

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;