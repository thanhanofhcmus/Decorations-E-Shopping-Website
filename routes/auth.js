const router = require('express').Router();
const passport = require('../auth/passport');
const model = require('../models/users');

router.get('/login', (req, res) => {
    res.render('auth', { somethingWrong: req.query.somethingWrong });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login?somethingWrong'
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
    const newUser = req.body;
    const users = await model.list();
    if (newUser.password !== newUser.confirmPassword) {
        res.render('auth', { signUpError: { passwordRetypeWrong: true } });
    } else if (users.find(({ username }) => username === newUser.username) !== undefined) {
        res.render('auth', { signUpError: { userExists: true } });
    } else {
        model.add(newUser);
        res.redirect('/');
    }
});

module.exports = router;
