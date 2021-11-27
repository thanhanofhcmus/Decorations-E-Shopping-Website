const productModel = require('../models/products');
const catalogModel = require('../models/catalog');

module.exports = async (req, res) => {
    const catalogs = await catalogModel.list();
    const allProducts = await Promise.all(catalogs.map(async catalog => {
        const products = (await productModel.findByCatalog(catalog.id)).map(productModel.toRenderData);
        return { catalog, products };
    }));

    res.render('index', {
        title: 'Trang Chủ',
        allProducts
    });
};
