const { getCollection } = require('../database');
const COLLECTION_NAME = 'category';

const list = () => {
    return getCollection(COLLECTION_NAME).find({}).toArray();
};

const find = category => getCollection(COLLECTION_NAME).find(category).toArray();

const findCategoryById = async (id) => {
    const categories = await getCollection(COLLECTION_NAME).find({ id }).toArray();
    return categories[0];
};

module.exports = {
    list,
    find,
    findCategoryById
};
