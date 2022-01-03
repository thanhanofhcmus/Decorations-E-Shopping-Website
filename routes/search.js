const router = require('express').Router();
const controller = require('../controllers/search');

router.get('/', controller.search);
router.post('/', controller.searchPost);

module.exports = router;
