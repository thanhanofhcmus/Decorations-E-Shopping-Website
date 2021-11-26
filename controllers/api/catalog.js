const productModel = require('../../models/products');

module.exports = async (req, res) => {
    const id = req.params.id;
    if (req.query.page) {
        const chunkSize = 1;
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        res.send(await productModel.findChunkByCatalogId(id, chunkSize, page - 1));
    } else {
        res.send(await productModel.findByCatalog(id));
    }
};
