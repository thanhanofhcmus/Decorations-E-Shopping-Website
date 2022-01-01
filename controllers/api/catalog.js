const productModel = require('../../models/products');
const catalogModel = require('../../models/catalog');

const list = async (req, res) => {
    const catalogs = await catalogModel.list();
    res.send(catalogs);
};

const listById = async (req, res) => {
    const id = req.params.id;
    if (req.query.page) {
        const chunkSize = 1;
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        res.send(await productModel.findChunkByCatalogId(id, chunkSize, page - 1));
    } else {
        res.send(await productModel.findByCatalog(id));
    }
};

module.exports = {
    list,
    listById
};
