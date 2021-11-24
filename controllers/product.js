const model = require('../models/products');

module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const product = model.toRenderData(await model.findById(id));
    res.render('detail-product', { ...product, title: product.name });
};