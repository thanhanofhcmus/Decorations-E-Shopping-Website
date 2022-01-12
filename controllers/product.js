const productsModel = require('../models/products');
const categoryModel = require('../models/category');
const userModel = require('../models/users');

const getOne = async (req, res) => {
    const id = req.params.id;
    const product = productsModel.toRenderData(await productsModel.findOne({ id }));
    const category = await categoryModel.find({ id: product.categoryId });
    const relatedProducts = (await productsModel.find({ categoryId: category[0].id, chunkSize: 10, offset: 0 }))
        .map(productsModel.toRenderData);
    res.render('detail-product', { ...product, title: product.name, category, relatedProducts });
};

const addToCart = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const product = productsModel.toRenderData(await productsModel.findOne({ id }));
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

const insertCommentPost = async (req, res) => {
    const { id, comment, rate, userName } = req.body;
    await productsModel.insertCommentById(id, { comment, rate, userName });
    res.redirect(req.get('referer'));
};

module.exports = {
    getOne,
    insertCommentPost,
    addToCart
};
