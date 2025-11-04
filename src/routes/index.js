const express = require('express');
const router = express.Router();
const db = require('../models/data');

// Página principal - carrega todas as seções com dados
router.get('/', (req, res) => {
    const data = db.getData();
    res.render('index', { title: 'Sobre', data });
});

// Mantém compatibilidade de rotas antigas redirecionando para âncoras
router.get('/formacao', (req, res) => res.redirect('/#formacao'));
router.get('/competencias', (req, res) => res.redirect('/#competencias'));
router.get('/social', (req, res) => res.redirect('/#social'));

module.exports = router;