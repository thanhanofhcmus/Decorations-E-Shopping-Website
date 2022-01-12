const router = require('express').Router();
const controller = require('../controllers/product');

router.get('/:id', controller.renderAll);

router.post('/add-comment', controller.insertCommentPost);

module.exports = router;
