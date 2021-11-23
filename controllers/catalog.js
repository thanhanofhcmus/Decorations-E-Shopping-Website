const productModel = require('../models/products');
const catalogModel = require('../models/catalog');

module.exports = async (req, res) => {
    const id = req.params.id;
    const products = (await productModel.findByCatalog(id)).map(productModel.toRenderData);
    const catalog = await catalogModel.findCatalogById(id);
    res.render('product-catalog', { title: catalog.name, products });
};
