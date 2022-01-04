const productsModel = require('../../models/products');
const categoryModel = require('../../models/category');

const list = async (req, res) => {
    const categories = await categoryModel.list();
    res.send(categories);
};

const listById = async (req, res) => {
    const id = req.params.id;
    if (req.query.page) {
        const chunkSize = 1;
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        res.send(await productsModel.find({ categoryId: id, chunkSize, offset: page - 1 }));
    } else {
        res.send(await productsModel.findByCategory(id));
    }
};

module.exports = {
    list,
    listById
};
