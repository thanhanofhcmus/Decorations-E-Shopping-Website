const model = require('../../models/users');

module.exports.list = async (req, res) => {
    res.send(await model.list());
};

module.exports.findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await model.findByUsername(username);
    res.send(user);
};
