const router = require('express').Router();
const controller = require('../controllers/profile');

router.get('/', controller.details);

router.get('/edit', controller.edit);
router.post('/edit', controller.editPost);

module.exports = router;
