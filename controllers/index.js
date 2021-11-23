const exampleProducts = require('../models/example-item');
const model = require('../models/products');

const newProducts = exampleProducts.slice(0, 8);
const hotProducts = exampleProducts.slice(8);

module.exports = async (req, res) => {
    const oldProducts = await model.list();
    const products = oldProducts.map(model.toRenderData);

    res.render('index', {
        title: 'Trang Chủ',
        products,
        newProducts,
        hotProducts
    });
};
