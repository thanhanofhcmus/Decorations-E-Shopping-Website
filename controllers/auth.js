const passport = require('../auth/passport');
const userModel = require('../models/users');
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');

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
    const data = req.body;
    const users = await userModel.list();
    if (data.password !== data.confirmPassword) {
        res.render('auth', { signUpError: { passwordRetypeWrong: true } });
    } else if (users.find(({ username }) => username === data.username) !== undefined) {
        res.render('auth', { signUpError: { userExists: true } });
    } else {
        console.log(data);
        const newUser = {
            id: uuid(),
            name: data.name,
            email: data.email,
            username: data.username,
            password: bcrypt.hashSync(data.password, 10),
            accountImage: '',
            block: false,
            cart: []
        };
        console.log(newUser);
        userModel.insert(newUser);
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
