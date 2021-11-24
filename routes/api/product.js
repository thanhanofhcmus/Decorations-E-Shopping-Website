const router = require('express').Router();
const controller = require('../../controllers/api/product');

module.exports = router.get('/', controller.list);
