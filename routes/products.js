const router = require('express').Router();
const controller = require('../controllers/product');

router.get('/:id', controller.getOne);

router.post('/:id', controller.updateOne);

module.exports = router;
