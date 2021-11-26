const router = require('express').Router();
const controller = require('../controllers/product');

router.get('/:id', controller.renderAll);

module.exports = router;
