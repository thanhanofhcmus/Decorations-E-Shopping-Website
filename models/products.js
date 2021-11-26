const { getCollection } = require('../database');

const COLLECTION_NAME = 'product';

module.exports.list = () => {
    return getCollection(COLLECTION_NAME).find({}).toArray();
};

module.exports.findById = async (id) => {
    const products = await getCollection(COLLECTION_NAME).find({ id }).toArray();
    return products[0];
};

module.exports.findByCatalog = (catalogId) =>
    getCollection(COLLECTION_NAME).find({ catalogId }).toArray();

module.exports.findChunkByCatalogId = (catalogId, chunkSize, offset) => {
    return getCollection(COLLECTION_NAME).find({ catalogId }).skip(offset * chunkSize).limit(chunkSize).toArray();
};

module.exports.getSizeByCatalogId = async (catalogId) => {
    return (await this.findByCatalog(catalogId)).length;
};

module.exports.toRenderData = (data) => {
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
