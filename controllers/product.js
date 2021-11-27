const model = require('../models/products');
const catalogModel = require('../models/catalog');

module.exports.renderAll = async (req, res) => {
    const id = req.params.id;
    const product = model.toRenderData(await model.findById(id));
    const catalog = await catalogModel.findCatalogById(product.catalogId);
    res.render('detail-product', { ...product, title: product.name, catalog });
};
