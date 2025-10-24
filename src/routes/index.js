const express = require('express');
const router = express.Router();

// Tornar "/" a página "sobre"
router.get('/', (req, res) => {
    res.render('index', { title: 'Sobre' });
});

router.get('/formacao', (req, res) => {
    res.render('formacao');
});

router.get('/competencias', (req, res) => {
    res.render('competencias');
});

router.get('/social', (req, res) => {
    res.render('social', );
});

module.exports = router;