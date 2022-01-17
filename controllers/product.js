const productsModel = require('../models/products');
const categoryModel = require('../models/category');
const userModel = require('../models/users');

const parseIntDefault = (num, _default) => {
    const numParsed = parseInt(num);
    return isNaN(numParsed) ? _default : numParsed;
};

const constructLink = (productId, chunkSize, page, size) => {
    const link = `/products/${productId}`;
    return {
        disablePrev: page === 1,
        disableNext: chunkSize * page >= size,
        firstLink: `${link}?commentPage=1`,
        lastLink: `${link}?commentPage=${Math.ceil(size / chunkSize)}`,
        nextLink: `${link}?commentPage=${page + 1}`,
        prevLink: `${link}?commentPage=${page - 1}`
    };
};

const getOne = async (req, res) => {
    const COMMENTS_CHUNK = 5;
    const id = req.params.id;
    const commentPage = parseIntDefault(req.query.commentPage, 1);
    const product = productsModel.toRenderData(await productsModel.findOne({ id }));
    const commentLength = product.comments.length;
    const category = await categoryModel.findOne({ id: product.categoryId });
    const relatedProducts = (await productsModel.find({ categoryId: category.id, chunkSize: 10, offset: 0 }))
        .map(productsModel.toRenderData);
    const renderProduct = {
        ...product,
        comments: product.comments.splice((commentPage - 1) * COMMENTS_CHUNK, COMMENTS_CHUNK)
    };
    res.render('detail-product', {
        ...renderProduct,
        ...constructLink(id, COMMENTS_CHUNK, commentPage, commentLength),
        commentPage,
        title: product.name,
        category,
        relatedProducts
    });
};

const addToCart = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (typeof res.locals.user !== 'undefined') {
        const user = await userModel.findByUsername(res.locals.user.username);
        const index = user.cart.findIndex((p) => p.productId === id);
        if (index > -1) {
            user.cart[index].quantity += parseInt(data.quantity);
        } else {
            user.cart.push({ productId: id, quantity: parseInt(data.quantity) });
        }
        await userModel.update(user.id, user);
        getOne(req, res);
    } else {
        res.render('auth');
    }
};

const insertCommentPost = async (req, res) => {
    const { id, comment, rate, userName } = req.body;
    console.log('insert comment');
    await productsModel.insertCommentById(id, { comment, rate, userName });
    res.redirect(`/products/${id}`);
};

module.exports = {
    getOne,
    insertCommentPost,
    addToCart
};
