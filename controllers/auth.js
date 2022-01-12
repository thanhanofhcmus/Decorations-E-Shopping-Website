const passport = require('../auth/passport');
const model = require('../models/users');

const redirectToLast = (req, res) => {
    res.redirect(req.session.lastLink);
};

const loginGet = (req, res) => {
    req.session.lastLink = req.get('referer');
    res.render('auth', { somethingWrong: req.query.somethingWrong });
};

const loginPost = passport.authenticate('local', {
    successRedirect: '/auth/redirect-to-last',
    failureRedirect: '/auth/login?somethingWrong'
});

const logoutPost = (req, res) => {
    req.logout();
    res.redirect('/');
};

const signupPost = async (req, res) => {
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
};

module.exports = {
    redirectToLast,
    loginGet,
    loginPost,
    logoutPost,
    signupPost
};
