const { getCollection } = require('../database');
const COLLECTION_NAME = 'product';

const categoriesModel = require('./category');

const isValidUnsigned = num =>
    num !== undefined && num !== null && typeof num === 'number' && !isNaN(num) && isFinite(num) && num >= 0;

const findRaw = async params => {
    const { id, productId, categoryId, keyword, chunkSize, offset, isFindOne } = params;
    const product = {};
    productId && (product.id = productId);
    id && (product.id = id);
    if (categoryId) {
        const categories = (await categoriesModel.find({ parentId: categoryId })).map(c => c.id);
        categories.push(categoryId);
        product.categoryId = { $in: categories };
    }
    keyword && (product.$text = { $search: `"${keyword}"`, $caseSensitive: false, $diacriticSensitive: false });
    const query = isFindOne
        ? getCollection(COLLECTION_NAME).findOne(product)
        : getCollection(COLLECTION_NAME).find(product);
    (isValidUnsigned(chunkSize) && isValidUnsigned(offset)) && (query.skip(offset * chunkSize).limit(chunkSize));
    return query;
};

const findByIds = ids => getCollection(COLLECTION_NAME).find({ id: { $in: ids } }).toArray();

const find = async params => (await findRaw(params)).toArray();
const findOne = params => findRaw({ ...params, isFindOne: true });
const getSize = async params => (await findRaw(params)).count();

const toRenderData = data => {
    const ratePercents = data.rate.map((v, i) => ({ key: i, percent: Math.round(v * 100 / data.rateCount), count: v })).splice(1).reverse();
    const price = Math.floor(data.price * (1 - data.discount));
    const saved = data.price - price;
    return {
        ...data,
        oldPrice: data.price,
        price,
        saved,
        ratePercents,
        discount: Math.floor(data.discount * 100),
        link: `/products/${data.id}`
    };
};

module.exports = {
    findByIds,
    find,
    findOne,
    getSize,
    toRenderData
};
