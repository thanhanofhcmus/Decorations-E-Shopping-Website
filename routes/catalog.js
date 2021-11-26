const router = require('express').Router();
const controller = require('../controllers/catalog');

router.get('/', (req, res) => {
    res.send('Dev');
});

router.get('/:id', controller.renderChunk);

module.exports = router;
