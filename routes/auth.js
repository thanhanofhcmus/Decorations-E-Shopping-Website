const router = require('express').Router();
const controller = require('../controllers/auth');

router.get('/login', controller.loginGet);

router.post('/login', controller.loginPost);

router.get('/logout', controller.logoutPost);

router.post('/sign-up', controller.signupPost);

module.exports = router;
