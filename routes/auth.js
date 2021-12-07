const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('auth.hbs');
});

module.exports = router;
