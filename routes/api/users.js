const router = require('express').Router();
const controller = require('../../controllers/api/user');

router.get('/all', controller.list);
router.get('/:username', controller.findByUsername);

module.exports = router;
