const router = require('express').Router();
const controller = require('../controllers/cart');

router.get('/', controller.getAll);

router.post('/', controller.payment);

module.exports = router;
