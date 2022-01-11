const productsModel = require('../models/products');
const categoryModel = require('../models/category');

module.exports = async (req, res) => {
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
