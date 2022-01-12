const productsModel = require('../models/products');
const categoryModel = require('../models/category');

const renderAll = async (req, res) => {
    const id = req.params.id;
    const product = productsModel.toRenderData(await productsModel.findOne({ id }));
    const category = await categoryModel.findCategoryById(product.categoryId);
    res.render('detail-product', { ...product, title: product.name, category });
};

const insertCommentPost = async (req, res) => {
    const { id, comment, rate, userName } = req.body;
    await productsModel.insertCommentById(id, { comment, rate, userName });
    res.redirect(req.get('referer'));
};

module.exports = {
    renderAll,
    insertCommentPost
};
