const express = require('express');
const controller = require('../controllers/index');

const router = express.Router();

router.get('/', controller.getIndex);

router.get('/verify-email', controller.verifyEmail);

module.exports = router;
