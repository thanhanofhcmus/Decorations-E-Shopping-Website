const router = require('express').Router();
const controller = require('../controllers/order');

router.get('/:id', controller.getOne);

module.exports = router;
