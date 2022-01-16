const { getCollection } = require('../database');
const COLLECTION_NAME = 'user';
const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4');

const mongoCollection = () => getCollection(COLLECTION_NAME);

const list = () => getCollection(COLLECTION_NAME).find({}).toArray();

const findByUsername = username => getCollection(COLLECTION_NAME).findOne({ username });

const findByToken = token => getCollection(COLLECTION_NAME).findOne({ token });

const insert = user => getCollection(COLLECTION_NAME).insertOne(user);

const create = (user, token) => {
    const newUser = {
        id: uuid(),
        name: user.name,
        email: user.email,
        username: user.username,
        password: bcrypt.hashSync(user.password, 10),
        accountImage: '',
        block: false,
        token: token,
        isVerified: false,
        cart: []
    };
    insert(newUser);
};

const update = (id, user) => getCollection(COLLECTION_NAME).updateOne({ id }, { $set: user }, { upsert: false });

const updatePassword = (id, unhashedPassword) => getCollection(COLLECTION_NAME).updateOne(
    { id },
    { $set: { password: bcrypt.hashSync(unhashedPassword, 10) } },
    { upsert: false }
);

const remove = id => getCollection(COLLECTION_NAME).deleteOne({ id });

const validPassword = (dbPassword, password) => bcrypt.compareSync(password, dbPassword);

module.exports = {
    mongoCollection,
    list,
    findByUsername,
    findByToken,
    insert,
    create,
    update,
    updatePassword,
    remove,
    validPassword
};
