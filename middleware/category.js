const model = require('../models/category');

module.exports = async (req, res, next) => {
    const parents = await model.find({ parentId: '' });
    const categories = await Promise.all(parents.map(async (parent) => ({
        parent,
        children: await model.find({ parentId: parent.id })
    })));
    res.locals.headerCategories = categories;
    next();
};
