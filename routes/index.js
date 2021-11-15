var express = require('express');
var router = express.Router();

const products = require('./example-item');

const newProducts = products.slice(0, 8);
const hotProducts = products.slice(8);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    newProducts: newProducts,
    hotProducts: hotProducts,
  });
});

module.exports = router;
