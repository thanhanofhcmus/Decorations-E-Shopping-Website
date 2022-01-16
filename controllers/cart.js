const productModel = require('../models/products');
const userModel = require('../models/users');
const orderModel = require('../models/order');
const { uuid } = require('uuidv4');

const getAll = async (req, res) => {
    const user = await userModel.findByUsername(res.locals.user.username);
    if (user.cart.length > 0) {
        const ids = user.cart.map(({ productId }) => productId);
        const products = (await productModel.findByIds(ids)).map(productModel.toRenderData);
        const cartList = products.map(p => ({
            ...p,
            quantity: user.cart.find(({ productId }) => productId === p.id).quantity
        }));
        const totalPrice = cartList.reduce((sum, a) => ({
            price: sum.price + a.price * a.quantity,
            oldPrice: sum.oldPrice + a.oldPrice * a.quantity
        }), ({ price: 28000, oldPrice: 0 }));
        const discount = totalPrice.oldPrice - totalPrice.price;
        res.render('cart', { numberProduct: products.length, cartList, discount, totalPrice });
    } else {
        res.render('cart', { numberProduct: 0 });
    }
};

const payment = async (req, res) => {
    const data = req.body;
    const products = data.productId.map((p, i) => ({
        productId: p,
        quantity: parseInt(data.quantity[i]),
        price: parseInt(data.price[i])
    })).slice(1);
    const newOrder = {
        id: uuid(),
        userId: data.id,
        address: data.address,
        phoneNumber: data.phone,
        message: data.note,
        productList: products,
        totalPrice: parseInt(data.total),
        shipOption: data['ship-option'],
        date: new Date(),
        status: 'Đang xác nhận'
    };
    const user = userModel.findByUsername(data.username);
    user.cart = [];
    orderModel.insert(newOrder);
    userModel.update(data.id, user);
    res.redirect('/');
};

module.exports = {
    getAll,
    payment
};
