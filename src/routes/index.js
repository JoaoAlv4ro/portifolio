const express = require('express');
const router = express.Router();
const db = require('../models/data');

// Página principal - carrega todas as seções com dados
router.get('/', (req, res) => {
    const data = db.getData();
    res.render('index', { title: 'Sobre', data });
});

module.exports = router;