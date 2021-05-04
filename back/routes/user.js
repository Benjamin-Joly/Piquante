const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const User = require('../models/User');
const rateLimit = require('express-rate-limit');

const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 3 // limit each IP to 100 requests per windowMs
});

const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 100 requests per windowMs
});



router.use(express.json());

router.post('/signup', signupLimiter , userCtrl.signup);
router.post('/login', loginLimiter, userCtrl.login);

module.exports = router;