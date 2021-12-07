const productRouter = require('./product');
const catalogRouter = require('./catalog');
const usersRouter = require('./users');
const router = require('express').Router();

router.use('/products', productRouter);
router.use('/catalogs', catalogRouter);
router.use('/users', usersRouter);

module.exports = router;
