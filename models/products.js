const { getCollection } = require('../database');
const COLLECTION_NAME = 'product';

const categoriesModel = require('./category');

const isValidUnsigned = num =>
    num !== undefined && num !== null && typeof num === 'number' && !isNaN(num) && isFinite(num) && num >= 0;

/*
This function is created so that we can be flexible in query params when we do a search query.
It can handle keywords, product Id, multiple category ids, chunk size and offset for pagination
and the lack of those params.
*/
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

const getAll = () => getCollection(COLLECTION_NAME).find({}).toArray();

const find = async params => (await findRaw(params)).toArray();
const findOne = params => findRaw({ ...params, isFindOne: true });
const getSize = async params => (await findRaw(params)).count();

const insertCommentById = (id, comment) => getCollection(COLLECTION_NAME).updateOne(
    { id },
    { $inc: { rateCount: 1, [`rate.${comment.rate}`]: 1 }, $push: { comments: comment } }
);

const toRenderData = data => {
    const ratePercents = data.rate
        .map((v, i) => ({ key: i, percent: Math.round(v * 100 / data.rateCount), count: v }))
        .splice(1)
        .reverse();
    const rateAverage = (ratePercents.reduce((a, r) => a + r.key * r.count, 0) / data.rateCount).toFixed(2);
    const price = Math.floor(data.price * (1 - data.discount));
    const saved = data.price - price;
    return {
        ...data,
        oldPrice: data.price,
        price,
        saved,
        ratePercents,
        rateAverage,
        discount: Math.floor(data.discount * 100),
        link: `/products/${data.id}`
    };
};

module.exports = {
    getAll,
    find,
    findOne,
    getSize,
    insertCommentById,
    toRenderData
};
