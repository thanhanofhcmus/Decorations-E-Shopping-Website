const router = require('express').Router();
const controller = require('../controllers/product');

router.get('/:id', controller.detail);

router.get('/', (req, res) => {
    res.render('detail-product');
});

module.exports = router;
