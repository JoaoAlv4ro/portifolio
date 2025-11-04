const express = require('express');
const router = express.Router();
const db = require('../models/data');

// GET /api/dados - retorna todo o conteúdo para futura renderização nas views
router.get('/dados', (req, res) => {
	try {
		const data = db.getData();
		res.json(data);
	} catch (err) {
		console.error('Erro ao ler dados:', err);
		res.status(500).json({ error: 'Erro interno ao ler os dados' });
	}
});

// ================== PROJETOS (CRUD) ==================
// GET /api/projetos
router.get('/projetos', (req, res) => {
	try {
		res.json(db.getProjects());
	} catch (err) {
		res.status(500).json({ error: 'Erro ao listar projetos' });
	}
});

// GET /api/projetos/:id
router.get('/projetos/:id', (req, res) => {
	const project = db.getProjectById(req.params.id);
	if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });
	res.json(project);
});

// POST /api/projetos
router.post('/projetos', (req, res) => {
	const { title, description, imageUrl, link } = req.body || {};
	if (!title || !description) {
		return res.status(400).json({ error: 'Campos obrigatórios: title, description' });
	}
	try {
		const created = db.addProject({ title, description, imageUrl, link });
		res.status(201).json(created);
	} catch (err) {
		console.error('Erro ao criar projeto:', err);
		res.status(500).json({ error: 'Erro ao criar projeto' });
	}
});

// PUT /api/projetos/:id
router.put('/projetos/:id', (req, res) => {
	try {
		const updated = db.updateProject(req.params.id, req.body || {});
		if (!updated) return res.status(404).json({ error: 'Projeto não encontrado' });
		res.json(updated);
	} catch (err) {
		console.error('Erro ao atualizar projeto:', err);
		res.status(500).json({ error: 'Erro ao atualizar projeto' });
	}
});

// DELETE /api/projetos/:id
router.delete('/projetos/:id', (req, res) => {
	try {
		const ok = db.deleteProject(req.params.id);
		if (!ok) return res.status(404).json({ error: 'Projeto não encontrado' });
		res.status(204).send();
	} catch (err) {
		console.error('Erro ao deletar projeto:', err);
		res.status(500).json({ error: 'Erro ao deletar projeto' });
	}
});

module.exports = router;
