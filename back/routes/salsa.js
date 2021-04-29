const express = require('express');
const router = express.Router();
const salsaCtrl = require('../controllers/salsaCtrl');
router.use(express.json());

router.post('/', salsaCtrl.createSalsa);
router.get('/', salsaCtrl.getAllSalsas);
// router.get('/:id', salsaCtrl.getOneSalsa);
// router.put('/:id', salsa.updateSalsa);
// router.delete('/:id', salsaCtrl.deleteSalsa);

module.exports = router;