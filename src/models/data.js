const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data.json');

function safeRead() {
	try {
		if (!fs.existsSync(DATA_PATH)) {
			// cria arquivo com estrutura básica
			const seed = {
				presentation: {
					fullName: "Seu Nome",
					contactEmail: "seu@email.com",
					bio: "Breve biografia...",
					profilePic: "/assets/profile.png"
				},
				education: [],
				certifications: [],
				technicalSkills: [],
				softSkills: [],
				languages: [],
				projects: [],
				socialLinks: []
			};
			fs.writeFileSync(DATA_PATH, JSON.stringify(seed, null, 2), 'utf8');
			return seed;
		}
		const raw = fs.readFileSync(DATA_PATH, 'utf8');
		return raw ? JSON.parse(raw) : {};
	} catch (err) {
		console.error('Falha ao ler data.json:', err);
		// Evita queda total retornando estrutura vazia mínima
		return { projects: [] };
	}
}

function write(data) {
	fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// ===== API de dados =====
function getData() {
	return safeRead();
}

// ===== CRUD de projetos =====
function getProjects() {
	const data = safeRead();
	return data.projects || [];
}

function getProjectById(id) {
	const data = safeRead();
	return (data.projects || []).find(p => p.id === parseInt(id));
}

function addProject(project) {
	const data = safeRead();
	const projects = data.projects || [];
	const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id || 0)) + 1 : 1;
	const newProject = { id: newId, title: '', description: '', imageUrl: '', link: '', ...project };
	projects.push(newProject);
	data.projects = projects;
	write(data);
	return newProject;
}

function updateProject(id, updatedProject) {
	const data = safeRead();
	const idx = (data.projects || []).findIndex(p => p.id === parseInt(id));
	if (idx === -1) return null;
	data.projects[idx] = { ...data.projects[idx], ...updatedProject, id: data.projects[idx].id };
	write(data);
	return data.projects[idx];
}

function deleteProject(id) {
	const data = safeRead();
	const idx = (data.projects || []).findIndex(p => p.id === parseInt(id));
	if (idx === -1) return false;
	data.projects.splice(idx, 1);
	write(data);
	return true;
}

module.exports = {
	getData,
	getProjects,
	getProjectById,
	addProject,
	updateProject,
	deleteProject,
};
