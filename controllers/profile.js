const usersModel = require('../models/users');
const orderModel = require('../models/order');
const productModel = require('../models/products');

const details = async (req, res) => {
    const user = res.locals.user;
    const orders = await orderModel.findByUserId(user.id);
    const productIds = orders.map(o => o.productList[0].productId);
    const products = (await productModel.findByIds(productIds)).map(productModel.toRenderData);
    const orderList = orders.map((o, i) => ({
        ...o,
        link: `/order/${o.id}`,
        numberProducts: o.productList.length - 1,
        product: { ...products[i], quantity: o.productList[0].quantity },
        productPrice: o.productList[0].price
    }));
    res.render('profile/details', { orderList });
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

const updatePasswordGet = (req, res) => {
    res.render('confirm-password');
};

const updatePasswordPost = async (req, res) => {
    const localUser = res.locals.user;
    console.log(res.body);
    const { oldPassword, password, confirmPassword } = req.body;
    const dbUser = await usersModel.findByUsername(localUser.username);
    if (usersModel.validPassword(dbUser.password, oldPassword)) {
        if (password === confirmPassword) {
            usersModel.updatePassword(localUser.id, password);
            res.redirect('/profile');
        } else {
            res.render('confirm-password', { retypeWrong: true });
        }
    } else {
        res.render('confirm-password', { oldPasswordWrong: true });
    }
};

module.exports = {
    details,
    edit,
    editPost,
    updatePasswordGet,
    updatePasswordPost
};
