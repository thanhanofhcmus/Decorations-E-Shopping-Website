const productsModel = require('../models/products');

const constructLink = (keyword, categoryId, page, chunkSize, size) => {
    const link = '/search?' +
         Object.entries({ keyword, categoryId, chunkSize })
             .filter(([_, v]) => v !== undefined)
             .map(kv => kv.join('='))
             .join('&');
    return {
        disablePrev: page === 1,
        disableNext: chunkSize * page >= size,
        firstLink: `${link}&page=1`,
        lastLink: `${link}&page=${Math.ceil(size / chunkSize)}`,
        nextLink: `${link}&page=${page + 1}`,
        prevLink: `${link}&page=${page - 1}`
    };
};

const search = async (req, res) => {
    const keyword = req.query.keyword;
    const page = parseInt(req.query.page) || 1;
    const chunkSize = parseInt(req.query.chunkSize) || 10;
    const categoryId = req.query.categoryId;

    const products = await productsModel.find({
        keyword,
        categoryId,
        offset: page - 1,
        chunkSize
    });
    const size = await productsModel.getSize({ keyword, categoryId });
    const renderProduct = products.map(productsModel.toRenderData);

    res.render('search', {
        title: 'Tìm kiếm',
        products: renderProduct,
        page,
        ...constructLink(keyword, categoryId, page, chunkSize, size)
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