const router = require('express').Router();
const controller = require('../../controllers/api/category');

router.get('/list', controller.list);
router.get('/:id', controller.listById);

module.exports = router;
