const productModel = require('../models/products');
const userModel = require('../models/users');

const getAll = async (req, res) => {
    const user = await userModel.findByUsername(res.locals.user.username);
    const ids = user.cart.map(({ productId }) => productId);
    const products = (await productModel.findByIds(ids)).map(productModel.toRenderData);
    const cartList = products.map(product => ({ ...product, quantity: user.cart.find(({ productId }) => productId === product.id).quantity }));
    const totalPrice = cartList.reduce((sum, a) => ({ price: sum.price + a.price * a.quantity, oldPrice: sum.oldPrice + a.oldPrice * a.quantity }));
    const discount = totalPrice.oldPrice - totalPrice.price;
    res.render('cart', { numberProduct: products.length, cartList, discount, totalPrice });
};

module.exports = {
    getAll
};
