const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const model = require('../models/users');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await model.findByUsername(username);
        if (!user || user.block) { return done(null, false); }
        if (!validPassword(user, password)) { return done(null, false); }
        return done(null, user);
    } catch (err) {
        done(err);
    }
}));

const validPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

passport.serializeUser((user, done) => {
    return done(null, { id: user.id, username: user.username, name: user.name, email: user.email });
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});

module.exports = passport;
