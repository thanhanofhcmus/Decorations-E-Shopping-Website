const passport = require('../auth/passport');
const usersModel = require('../models/users');

const redirectToLast = (req, res) => {
    res.redirect(req.session.lastLink);
};

const loginGet = (req, res) => {
    req.session.lastLink = req.get('referer');
    res.render('auth', { somethingWrong: req.query.somethingWrong });
};

const loginPost = passport.authenticate('local', {
    successRedirect: '/auth/redirect-to-last',
    failureRedirect: '/auth/login?somethingWrong=1'
});

const logoutPost = (req, res) => {
    req.logout();
    res.redirect('/');
};

const signupPost = async (req, res) => {
    const data = req.body;
    const users = await usersModel.list();
    if (data.password !== data.confirmPassword) {
        res.render('auth', { signUpError: { passwordRetypeWrong: true } });
    } else if (users.find(({ username }) => username === data.username) !== undefined) {
        res.render('auth', { signUpError: { userExists: true } });
    } else {
        usersModel.create(data);
        res.redirect('/');
    }
};

const deleteGet = (req, res) => {
    res.render('confirm-login');
};

const deletePost = async (req, res) => {
    const localUser = res.locals.user;
    const dbUser = await usersModel.findByUsername(localUser.username);
    if (usersModel.validPassword(dbUser.password, req.body.password)) {
        usersModel.remove(localUser.id);
        res.redirect('/');
    } else {
        res.render('confirm-login', { somethingWrong: true });
    }
};

module.exports = {
    redirectToLast,
    loginGet,
    loginPost,
    logoutPost,
    signupPost,
    deleteGet,
    deletePost
};
