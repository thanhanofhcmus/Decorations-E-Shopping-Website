const router = require('express').Router();
const controller = require('../controllers/auth');

router.get('/redirect-to-last', controller.redirectToLast);

router.get('/login', controller.loginGet);

router.post('/login', controller.loginPost);

router.get('/logout', controller.logoutPost);

router.post('/sign-up', controller.signupPost);

router.get('/delete', controller.deleteGet);

router.post('/delete', controller.deletePost);

module.exports = router;
