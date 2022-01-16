const productsModel = require('../models/products');
const categoryModel = require('../models/category');
const userModel = require('../models/users');

const getIndex = async (req, res) => {
    const categories = await categoryModel.list();
    const products = await productsModel.getAll();
    const allProducts = categories.map(category => ({
        category,
        products: products.filter(p => p.categoryId === category.id).map(productsModel.toRenderData)
    }));
    res.render('index', {
        title: 'Trang Chủ',
        allProducts
    });
};

const verifyEmail = async (req, res) => {
    const token = req.query.token;
    console.log(token);
    const user = await userModel.findByToken(token);
    console.log(user);
    if (user) {
        user.token = '';
        user.isVerified = true;
        console.log(user);
        userModel.update(user.id, user);
    };
    getIndex(req, res);
};

module.exports = {
    getIndex,
    verifyEmail
};
