const router = require('express').Router();
const controller = require('../controllers/profile');

router.get('/', controller);

module.exports = router;
