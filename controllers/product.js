const productModel = require('../models/products');
const categoryModel = require('../models/category');
const userModel = require('../models/users');

const getOne = async (req, res) => {
    const id = req.params.id;
    const product = productModel.toRenderData(await productModel.findOne({ id }));
    const category = await categoryModel.find({ id: product.categoryId });
    const data = (await productModel.find({ categoryId: category[0].id })).map(productModel.toRenderData);
    const relatedProducts = data.slice(0, Math.min(6, data.length));
    res.render('detail-product', { ...product, title: product.name, category, relatedProducts });
};

const addToCart = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const product = productModel.toRenderData(await productModel.findOne({ id }));
    const category = await categoryModel.find({ categoryId: product.categoryId });
    if (typeof res.locals.user !== 'undefined') {
        const user = await userModel.findByUsername(res.locals.user.username);
        const index = user.cart.findIndex((p) => p.productId === id);
        if (index > -1) {
            user.cart[index].quantity += data.quantity;
        } else {
            user.cart.push({ productId: id, quantity: 1 });
        }
        await userModel.update(user.id, user);
        res.render('detail-product', { ...product, title: product.name, category });
    } else {
        res.render('auth');
    }
};

module.exports = {
    getOne,
    addToCart
};
