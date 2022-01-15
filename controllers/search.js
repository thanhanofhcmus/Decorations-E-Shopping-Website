const productsModel = require('../models/products');
const categoriesModel = require('../models/category');

const makeLinkParams = obj => Object.entries(obj)
    .filter(([_, v]) => v !== undefined)
    .map(kv => kv.join('='))
    .join('&');

const parseIntUndef = num => {
    const numParsed = parseInt(num);
    return isNaN(numParsed) ? undefined : numParsed;
};

const constructLink = (param, size) => {
    const link = '/search?' + makeLinkParams(param);
    return {
        disablePrev: param.page === 1,
        disableNext: param.chunkSize * param.page >= size,
        firstLink: `${link}&page=1`,
        lastLink: `${link}&page=${Math.ceil(size / param.chunkSize)}`,
        nextLink: `${link}&page=${param.page + 1}`,
        prevLink: `${link}&page=${param.page - 1}`
    };
};

const search = async (req, res) => {
    const query = req.query;

    const keyword = query.keyword;
    const page = parseInt(query.page) || 1;
    const chunkSize = parseInt(query.chunkSize) || 10;
    const categoryId = query.categoryId;

    const priceLT = parseIntUndef(query.priceLT);
    const priceGT = parseIntUndef(query.priceGT);
    const priceOrder = parseIntUndef(query.priceOrder);
    const discountOrder = parseIntUndef(query.discountOrder);

    const products = await productsModel.find({
        keyword,
        categoryId,
        offset: page - 1,
        chunkSize,
        price: { $lt: priceLT, $gt: priceGT },
        sort: { price: priceOrder, discount: discountOrder }
    });
    const size = await productsModel.getSize({ keyword, categoryId });
    const categories = await categoriesModel.list();
    const renderProduct = products.map(productsModel.toRenderData);

    res.render('search', {
        title: 'Tìm kiếm',
        products: renderProduct,
        categories,
        page,
        ...constructLink(
            { keyword, categoryId, page, chunkSize, priceLT, priceGT, priceOrder, discountOrder },
            size
        )
    });
};

const searchPost = (req, res) => {
    const trueString = str => {
        if (str === undefined || str === null) {
            return undefined;
        }
        const trim = str.trim();
        return trim || undefined;
    };
    const keyword = req.body.keyword;
    const priceRange = parseIntUndef(req.body.priceRange);
    let priceLT;
    let priceGT;
    switch (priceRange) {
    case 1: priceLT = 20000; break;
    case 2: priceGT = 20000; priceLT = 50000; break;
    case 3: priceGT = 50000; priceLT = 100000; break;
    case 4: priceGT = 100000; priceLT = 200000; break;
    case 5: priceGT = 200000; break;
    }
    const link = '/search?' + makeLinkParams({ ...req.body, priceGT, priceLT, keyword: trueString(keyword), page: 1 });
    res.redirect(link);
};

module.exports = {
    search,
    searchPost
};
