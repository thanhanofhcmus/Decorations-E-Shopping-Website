const { getCollection } = require('../database');
const COLLECTION_NAME = 'catalog';

module.exports.list = () => {
    return getCollection(COLLECTION_NAME).find({}).toArray();
};

module.exports.findCatalogById = async (id) => {
    const catalogs = await getCollection(COLLECTION_NAME).find({ id }).toArray();
    return catalogs[0];
};
