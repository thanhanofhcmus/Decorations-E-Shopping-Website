const productRouter = require('./product');
const router = require('express').Router();

router.use('/products', productRouter);

module.exports = router;
