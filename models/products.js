const { getCollection } = require('../database');
const COLLECTION_NAME = 'product';

const list = () => getCollection(COLLECTION_NAME).find({}).toArray();

const findById = async id => (await getCollection(COLLECTION_NAME).find({ id }).toArray())[0];

const findByCatalog = (catalogId) => getCollection(COLLECTION_NAME).find({ catalogId }).toArray();

const findChunkByCatalogId = (catalogId, chunkSize, offset) =>
    getCollection(COLLECTION_NAME).find({ catalogId }).skip(offset * chunkSize).limit(chunkSize).toArray();

const getSizeByCatalogId = async catalogId => (await this.findByCatalog(catalogId)).length;

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
    list,
    findById,
    findByCatalog,
    findChunkByCatalogId,
    getSizeByCatalogId,
    toRenderData
};
