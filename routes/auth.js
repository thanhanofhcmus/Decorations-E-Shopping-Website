const router = require('express').Router();
const controller = require('../controllers/auth');

router.get('/redirect-to-last', controller.redirectToLast);

router.get('/login', controller.loginGet);

router.post('/login', controller.loginPost);

router.get('/logout', controller.logoutPost);

router.post('/sign-up', controller.signupPost);

router.get('/delete', controller.deleteGet);

router.post('/delete', controller.deletePost);

router.get('/forgot-password', controller.forgotPasswordGet);

router.post('/forgot-password', controller.forgotPasswordPost);

module.exports = router;
