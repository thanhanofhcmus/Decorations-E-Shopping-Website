const { getCollection } = require('../database');
const COLLECTION_NAME = 'catalog';

const list = () => {
    return getCollection(COLLECTION_NAME).find({}).toArray();
};

const findCatalogById = async (id) => {
    const catalogs = await getCollection(COLLECTION_NAME).find({ id }).toArray();
    return catalogs[0];
};

module.exports = {
    list,
    findCatalogById
};
