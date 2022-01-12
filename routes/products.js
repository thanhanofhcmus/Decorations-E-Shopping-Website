const router = require('express').Router();
const controller = require('../controllers/product');

router.get('/:id', controller.getOne);

router.post('/:id', controller.addToCart);

router.post('/add-comment', controller.insertCommentPost);

module.exports = router;
