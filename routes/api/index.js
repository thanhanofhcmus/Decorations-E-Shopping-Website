const productRouter = require('./product');
const categoryRouter = require('./category');
const usersRouter = require('./users');
const router = require('express').Router();

router.use('/products', productRouter);
router.use('/categorys', categoryRouter);
router.use('/users', usersRouter);

module.exports = router;
