const router = require('express').Router();
const controller = require('../controllers/product');

router.post('/add-comment', controller.insertCommentPost);

router.get('/:id', controller.getOne);
router.post('/:id', controller.addToCart);

module.exports = router;
