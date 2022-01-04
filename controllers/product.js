const model = require('../models/products');
const categoryModel = require('../models/category');

module.exports.renderAll = async (req, res) => {
    const id = req.params.id;
    const product = model.toRenderData(await model.findOne({ id }));
    const category = await categoryModel.find({ categoryId: product.categoryId });
    res.render('detail-product', { ...product, title: product.name, category });
};
