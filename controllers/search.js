const productsModel = require('../models/products');

const constructLink = (keyword, catalogId, page, chunkSize, size) => {
    const link = '/search?' +
         Object.entries({ keyword, catalogId, chunkSize })
             .filter(([_, v]) => v !== undefined)
             .map(([k, v]) => k + '=' + v)
             .reduce((a, v) => a + '&' + v);
    return {
        disablePrev: page === 1,
        disableNext: chunkSize * page >= size,
        firstLink: `${link}&page=1`,
        lastLink: `${link}&page=${Math.floor(size / chunkSize)}`,
        nextLink: `${link}&page=${page + 1}`,
        prevLink: `${link}&page=${page - 1}`
    };
};

const search = async (req, res) => {
    const keyword = req.query.keyword;
    const page = parseInt(req.query.page) || 1;
    const chunkSize = parseInt(req.query.chunkSize) || 10;
    const catalogId = req.query.catalogId;

    const size = await productsModel.getSizeByKeyword(keyword);
    const products = await productsModel.find({
        keyword,
        offset: page - 1,
        chunkSize,
        catalogId
    });
    const renderProduct = products.map(productsModel.toRenderData);

    res.render('search', {
        title: 'Tìm kiếm',
        products: renderProduct,
        page,
        ...constructLink(keyword, catalogId, page, chunkSize, size)
    });
};

const searchPost = (req, res) => {
    const { keyword } = req.body;
    res.redirect(`/search?keyword=${keyword}&page=1`);
};

module.exports = {
    search,
    searchPost
};
