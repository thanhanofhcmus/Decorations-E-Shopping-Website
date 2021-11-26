const productRouter = require('./product');
const catalogRouter = require('./catalog');
const router = require('express').Router();

router.use('/products', productRouter);
router.use('/catalogs', catalogRouter);

module.exports = router;
