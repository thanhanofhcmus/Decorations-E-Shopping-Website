const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('detail-product', {
        title: 'Product'
    });
});

module.exports = router;
