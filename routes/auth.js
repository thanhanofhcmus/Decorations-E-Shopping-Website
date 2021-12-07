const router = require('express').Router();
const passport = require('../auth/passport');

router.get('/login', (req, res) => {
    res.render('auth', { wrongPassword: req.query.wrongPassword !== undefined }
    );
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/auth/login?wrongPassword' }),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
