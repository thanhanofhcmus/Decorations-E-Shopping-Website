const router = require('express').Router();
const controller = require('../../controllers/api/catalog');

router.get('/:id', controller);

module.exports = router;
