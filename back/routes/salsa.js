const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const salsaCtrl = require('../controllers/salsaCtrl');
router.use(express.json());
router.use(globalLimiter);

router.post('/', auth, multer ,salsaCtrl.createSalsa);
router.post('/:id/like', auth, salsaCtrl.likeSalsa);
router.get('/', auth ,salsaCtrl.getAllSalsas);
router.get('/:id', auth , salsaCtrl.getOneSalsa);
router.put('/:id', auth, multer ,salsaCtrl.updateSalsa);
router.delete('/:id', auth ,salsaCtrl.deleteOneSalsa);


module.exports = router;