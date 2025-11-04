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


// ========== PRESENTATION (Sobre) ==========
router.get('/presentation', (req, res) => {
	try {
		res.json(db.getPresentation());
	} catch (err) {
		console.error('Erro ao obter presentation:', err);
		res.status(500).json({ error: 'Erro ao obter presentation' });
	}
});

router.put('/presentation', (req, res) => {
	try {
		const updated = db.updatePresentation(req.body || {});
		res.json(updated);
	} catch (err) {
		console.error('Erro ao atualizar presentation:', err);
		res.status(500).json({ error: 'Erro ao atualizar presentation' });
	}
});

// ========== EDUCATION (Formação) ==========
router.get('/education', (req, res) => {
	try {
		res.json(db.getEducation());
	} catch (err) {
		console.error('Erro ao listar educação:', err);
		res.status(500).json({ error: 'Erro ao listar educação' });
	}
});

router.post('/education', (req, res) => {
	try {
		const created = db.addEducation(req.body || {});
		res.status(201).json(created);
	} catch (err) {
		console.error('Erro ao criar educação:', err);
		res.status(500).json({ error: 'Erro ao criar educação' });
	}
});

router.put('/education/:index', (req, res) => {
	try {
		const updated = db.updateEducation(req.params.index, req.body || {});
		if (!updated) return res.status(404).json({ error: 'Registro de educação não encontrado' });
		res.json(updated);
	} catch (err) {
		console.error('Erro ao atualizar educação:', err);
		res.status(500).json({ error: 'Erro ao atualizar educação' });
	}
});

router.delete('/education/:index', (req, res) => {
	try {
		const ok = db.deleteEducation(req.params.index);
		if (!ok) return res.status(404).json({ error: 'Registro de educação não encontrado' });
		res.status(204).send();
	} catch (err) {
		console.error('Erro ao deletar educação:', err);
		res.status(500).json({ error: 'Erro ao deletar educação' });
	}
});

// ========== CERTIFICATIONS ==========
router.get('/certifications', (req, res) => {
	try {
		res.json(db.getCertifications());
	} catch (err) {
		console.error('Erro ao listar certificações:', err);
		res.status(500).json({ error: 'Erro ao listar certificações' });
	}
});

router.post('/certifications', (req, res) => {
	try {
		const created = db.addCertification(req.body || {});
		res.status(201).json(created);
	} catch (err) {
		console.error('Erro ao criar certificação:', err);
		res.status(500).json({ error: 'Erro ao criar certificação' });
	}
});

router.put('/certifications/:index', (req, res) => {
	try {
		const updated = db.updateCertification(req.params.index, req.body || {});
		if (!updated) return res.status(404).json({ error: 'Certificação não encontrada' });
		res.json(updated);
	} catch (err) {
		console.error('Erro ao atualizar certificação:', err);
		res.status(500).json({ error: 'Erro ao atualizar certificação' });
	}
});

router.delete('/certifications/:index', (req, res) => {
	try {
		const ok = db.deleteCertification(req.params.index);
		if (!ok) return res.status(404).json({ error: 'Certificação não encontrada' });
		res.status(204).send();
	} catch (err) {
		console.error('Erro ao deletar certificação:', err);
		res.status(500).json({ error: 'Erro ao deletar certificação' });
	}
});

// ========== TECHNICAL SKILLS ==========
router.get('/technical-skills', (req, res) => {
	try {
		res.json(db.getTechnicalSkills());
	} catch (err) {
		console.error('Erro ao obter technical skills:', err);
		res.status(500).json({ error: 'Erro ao obter technical skills' });
	}
});

router.put('/technical-skills', (req, res) => {
	try {
		const list = Array.isArray(req.body) ? req.body : (req.body && req.body.list);
		const updated = db.setTechnicalSkills(list || []);
		res.json(updated);
	} catch (err) {
		console.error('Erro ao atualizar technical skills:', err);
		res.status(500).json({ error: 'Erro ao atualizar technical skills' });
	}
});

router.post('/technical-skills', (req, res) => {
	try {
		const { skill } = req.body || {};
		const updated = db.addTechnicalSkill(skill);
		res.status(201).json(updated);
	} catch (err) {
		console.error('Erro ao adicionar technical skill:', err);
		res.status(500).json({ error: 'Erro ao adicionar technical skill' });
	}
});

router.delete('/technical-skills/:index', (req, res) => {
	try {
		const ok = db.deleteTechnicalSkill(req.params.index);
		if (!ok) return res.status(404).json({ error: 'Índice inválido' });
		res.status(204).send();
	} catch (err) {
		console.error('Erro ao deletar technical skill:', err);
		res.status(500).json({ error: 'Erro ao deletar technical skill' });
	}
});

// ========== SOFT SKILLS ==========
router.get('/soft-skills', (req, res) => {
	try {
		res.json(db.getSoftSkills());
	} catch (err) {
		console.error('Erro ao obter soft skills:', err);
		res.status(500).json({ error: 'Erro ao obter soft skills' });
	}
});

router.put('/soft-skills', (req, res) => {
	try {
		const list = Array.isArray(req.body) ? req.body : (req.body && req.body.list);
		const updated = db.setSoftSkills(list || []);
		res.json(updated);
	} catch (err) {
		console.error('Erro ao atualizar soft skills:', err);
		res.status(500).json({ error: 'Erro ao atualizar soft skills' });
	}
});

router.post('/soft-skills', (req, res) => {
	try {
		const { skill } = req.body || {};
		const updated = db.addSoftSkill(skill);
		res.status(201).json(updated);
	} catch (err) {
		console.error('Erro ao adicionar soft skill:', err);
		res.status(500).json({ error: 'Erro ao adicionar soft skill' });
	}
});

router.delete('/soft-skills/:index', (req, res) => {
	try {
		const ok = db.deleteSoftSkill(req.params.index);
		if (!ok) return res.status(404).json({ error: 'Índice inválido' });
		res.status(204).send();
	} catch (err) {
		console.error('Erro ao deletar soft skill:', err);
		res.status(500).json({ error: 'Erro ao deletar soft skill' });
	}
});

// ========== SOCIAL LINKS ==========
router.get('/social-links', (req, res) => {
	try {
		res.json(db.getSocialLinks());
	} catch (err) {
		console.error('Erro ao obter social links:', err);
		res.status(500).json({ error: 'Erro ao obter social links' });
	}
});

router.post('/social-links', (req, res) => {
	try {
		const created = db.addSocialLink(req.body || {});
		res.status(201).json(created);
	} catch (err) {
		console.error('Erro ao adicionar social link:', err);
		res.status(500).json({ error: 'Erro ao adicionar social link' });
	}
});

router.put('/social-links/:index', (req, res) => {
	try {
		const updated = db.updateSocialLink(req.params.index, req.body || {});
		if (!updated) return res.status(404).json({ error: 'Social link não encontrado' });
		res.json(updated);
	} catch (err) {
		console.error('Erro ao atualizar social link:', err);
		res.status(500).json({ error: 'Erro ao atualizar social link' });
	}
});

router.delete('/social-links/:index', (req, res) => {
	try {
		const ok = db.deleteSocialLink(req.params.index);
		if (!ok) return res.status(404).json({ error: 'Social link não encontrado' });
		res.status(204).send();
	} catch (err) {
		console.error('Erro ao deletar social link:', err);
		res.status(500).json({ error: 'Erro ao deletar social link' });
	}
});

module.exports = router;
