const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const model = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await model.findByUsername(username);
        if (!user) { return done(null, false); }
        if (user.password !== password) { return done(null, false); }
        return done(null, user);
    } catch (err) {
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, { username: user.username, name: user.name, email: user.email });
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});

module.exports = passport;
