const { getCollection } = require('../database');

const COLLECTION_NAME = 'product';

module.exports.list = async () => {
    return await getCollection(COLLECTION_NAME).find({}).toArray();
};

module.exports.findById = async (id) => {
    return await getCollection(COLLECTION_NAME).find({ id }).toArray();
};

module.exports.findByCatalog = async (catalogId) => {
    return await getCollection(COLLECTION_NAME).find({ catalogId }).toArray();
};

module.exports.toRenderData = (data) => ({
    ...data,
    oldPrice: data.price,
    price: Math.floor(data.price * (1 - data.discount)),
    discount: Math.floor(data.discount * 100)
});
