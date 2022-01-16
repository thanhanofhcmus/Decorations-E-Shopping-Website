const passport = require('../auth/passport');
const usersModel = require('../models/users');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const redirectToLast = (req, res) => {
    res.redirect(req.session.lastLink);
};

const loginGet = (req, res) => {
    // remember last link if the link is not from /auth
    const referer = req.get('referer');
    if (!referer.includes('/auth')) {
        req.session.lastLink = referer;
    }
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
    } else if (users.find(({ email }) => email === data.email) !== undefined) {
        res.render('auth', { signUpError: { emailExists: true } });
    } else {
        const accessToken = await oAuth2Client.getAccessToken();

        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // true for 465, false for other ports
            auth: {
                type: 'OAuth2',
                user: 'websitemihishop@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        const token = Math.random().toString(36).substr(2, 10);
        const msg = {
            from: '"MiHi Shop" <websitemihishop@gmail.com>', // sender address
            to: `${data.email}`, // list of receivers
            subject: 'verify email required', // Subject line
            text: `
            Hello
            http://${req.headers.host}/verify-email?token=${token}` // plain text body
        };
        // send mail with defined tr
        usersModel.create(data, token);
        await transporter.sendMail(msg);
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
