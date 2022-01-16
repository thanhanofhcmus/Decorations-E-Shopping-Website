const productModel = require('../models/products');
const orderModel = require('../models/order');

const getOne = async (req, res) => {
    const id = req.params.id;
    const order = await orderModel.findById(id);
    const productIds = order.productList.map(p => p.productId);
    const products = (await productModel.findByIds(productIds)).map(productModel.toRenderData);
    const productList = products.map((p, i) => ({
        ...p,
        quantity: order.productList[i].quantity,
        orderPrice: order.productList[i].price
    }));
    res.render('order', { order, numberProduct: productList.length, productList });
};

module.exports = {
    getOne
};
