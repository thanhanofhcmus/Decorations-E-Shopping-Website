const productsModel = require('../models/products');
const categoryModel = require('../models/category');

module.exports = async (req, res) => {
    const categories = await categoryModel.list();
    const allProducts = await Promise.all(categories.map(async category => {
        const data = (await productsModel.find({ categoryId: category.id })).map(productsModel.toRenderData);
        const products = data.slice(0, Math.min(9, data.length));
        return { category, products };
    }));

    res.render('index', {
        title: 'Trang Chủ',
        allProducts
    });
};
