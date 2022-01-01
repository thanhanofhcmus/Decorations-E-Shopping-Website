const model = require('../models/catalog');

module.exports = async (req, res, next) => {
    const catalogs = await model.list();
    res.locals.headerCatalogs = catalogs;
    next();
};
