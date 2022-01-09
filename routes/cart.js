const router = require('express').Router();
const controller = require('../controllers/cart');

router.get('/', controller.getAll);

module.exports = router;
