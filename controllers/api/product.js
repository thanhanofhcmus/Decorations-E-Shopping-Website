const model = require('../../models/products');

module.exports.list = async (req, res) => {
    res.send(await model.list());
};
