const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const salsaCtrl = require('../controllers/salsaCtrl');
router.use(express.json());

router.post('/', auth, multer ,salsaCtrl.createSalsa);
router.post('/:id/like', auth, salsaCtrl.likeSalsa);
router.get('/', auth ,salsaCtrl.getAllSalsas);
router.get('/:id', auth , salsaCtrl.getOneSalsa);
router.put('/:id', auth, multer ,salsaCtrl.updateSalsa);
router.delete('/:id', auth ,salsaCtrl.deleteOneSalsa);


module.exports = router;