const usersModel = require('../models/users');

const details = (req, res) => {
    res.render('profile/details');
};

const edit = (req, res) => {
    res.render('profile/edit');
};

const editPost = async (req, res) => {
    await usersModel.update(res.locals.user.id, req.body);
    res.redirect('/auth/logout');
};

module.exports = {
    details,
    edit,
    editPost
};
