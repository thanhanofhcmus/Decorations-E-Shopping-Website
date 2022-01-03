const { getCollection } = require('../database');
const COLLECTION_NAME = 'product';

const isValidUnsigned = num =>
    num !== undefined && num !== null && typeof num === 'number' && !isNaN(num) && isFinite(num) && num >= 0;

const findRaw = params => {
    const { productId, catalogId, keyword, chunkSize, offset, isFindOne } = params;
    const product = {};
    productId && (product.id = productId);
    catalogId && (product.catalogId = catalogId);
    keyword && (product.$text = { $search: `"${keyword}"` });
    const query = isFindOne
        ? getCollection(COLLECTION_NAME).findOne(product)
        : getCollection(COLLECTION_NAME).find(product);
    (isValidUnsigned(chunkSize) && isValidUnsigned(offset)) && (query.skip(offset * chunkSize).limit(chunkSize));
    return query;
};

const find = params => findRaw(params).toArray();
const findOne = params => findRaw({ ...params, isFindOne: true });

const list = () => findRaw().toArray();

const findById = id => findRaw({ id, isFindOne: true });

const findByCatalog = catalogId => findRaw({ catalogId }).toArray();

const findByKeyword = keyword => findRaw({ keyword }).toArray();

const findChunkByCatalogId = (catalogId, chunkSize, offset) => findRaw({ catalogId, chunkSize, offset }).toArray();

const findChunkByKeyword = (keyword, chunkSize, offset) => findRaw({ keyword, chunkSize, offset }).toArray();

const getSizeByCatalogId = catalogId => findRaw({ catalogId }).count();

const getSizeByKeyword = keyword => findRaw({ keyword }).count();

const toRenderData = data => {
    const price = Math.floor(data.price * (1 - data.discount));
    const saved = data.price - price;
    return {
        ...data,
        oldPrice: data.price,
        price,
        saved,
        discount: Math.floor(data.discount * 100),
        link: `/products/${data.id}`
    };
};

module.exports = {
    find,
    findOne,
    list,
    findById,
    findByCatalog,
    findChunkByCatalogId,
    getSizeByCatalogId,
    findByKeyword,
    findChunkByKeyword,
    getSizeByKeyword,
    toRenderData
};
