const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const salsaCtrl = require('../controllers/salsaCtrl');
const authAdmin = require('../middleware/auth-admin');
router.use(express.json());

router.post('/', auth, multer ,salsaCtrl.createSalsa);
router.get('/', auth ,salsaCtrl.getAllSalsas);
router.get('/:id', authAdmin , salsaCtrl.getOneSalsa);
router.put('/:id', auth, multer ,salsaCtrl.updateSalsa);
router.delete('/:id', auth ,salsaCtrl.deleteOneSalsa);
router.post('/:id/like', auth, salsaCtrl.likeSalsa);

module.exports = router;