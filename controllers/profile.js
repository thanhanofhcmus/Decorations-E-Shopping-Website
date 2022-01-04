const usersModel = require('../models/users');

const details = (req, res) => {
    res.render('profile/details');
};

const edit = (req, res) => {
    res.render('profile/edit');
};

const editPost = async (req, res) => {
    const localUser = res.locals.user;
    const postUser = req.body;
    await usersModel.update(localUser.id, postUser);
    res.locals.user = {
        ...localUser,
        ...postUser
    };
    res.redirect('/auth/logout');
};

module.exports = {
    details,
    edit,
    editPost
};
