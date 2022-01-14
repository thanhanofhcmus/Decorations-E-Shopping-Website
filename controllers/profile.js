const usersModel = require('../models/users');
const orderModel = require('../models/order');
const productModel = require('../models/products');

const details = async (req, res) => {
    const user = res.locals.user;
    console.log(user);
    const orders = await orderModel.findByUserId(user.id);
    const productIds = orders.map(o => o.productList[0].productId);
    const products = (await productModel.findByIds(productIds)).map(productModel.toRenderData);
    console.log(products);
    const orderList = orders.map((o, i) => ({
        ...o,
        link: `/order/${o.id}`,
        numberProducts: o.productList.length - 1,
        product: { ...products[i], quantity: o.productList[0].quantity },
        productPrice: o.productList[0].price
    }));
    console.log(orderList);
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

module.exports = {
    details,
    edit,
    editPost
};
