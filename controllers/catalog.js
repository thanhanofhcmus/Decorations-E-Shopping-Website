const productModel = require('../models/products');
const catalogModel = require('../models/catalog');

module.exports.renderAll = async (req, res) => {
    const id = req.params.id;
    const products = (await productModel.findByCatalog(id)).map(productModel.toRenderData);
    const catalog = await catalogModel.findCatalogById(id);
    res.render('product-catalog', { title: catalog.name, products });
};

module.exports.renderChunk = async (req, res) => {
    const id = req.params.id;
    const chunkSize = 1;
    const page = Math.max(parseInt(req.query.page) || 1, 1);

    const size = await productModel.getSizeByCatalogId(id);
    const products = (await productModel.findChunkByCatalogId(id, chunkSize, page - 1)).map(productModel.toRenderData);
    const catalog = await catalogModel.findCatalogById(id);
    res.render('product-catalog', {
        title: catalog.name,
        products,
        page,
        disablePrev: page === 1,
        disableNext: chunkSize * page >= size,
        firstLink: `/catalogs/${id}/?page=1`,
        lastLink: `/catalogs/${id}/?page=${Math.floor(size / chunkSize)}`,
        nextLink: `/catalogs/${id}/?page=${page + 1}`,
        prevLink: `/catalogs/${id}/?page=${page - 1}`
    });
};
