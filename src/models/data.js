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

// ===== Presentation (Sobre) =====
function getPresentation() {
	const data = safeRead();
	return data.presentation || {};
}

function updatePresentation(partial) {
	const data = safeRead();
	data.presentation = { ...(data.presentation || {}), ...(partial || {}) };
	write(data);
	return data.presentation;
}

// ===== Education (Formação) =====
function getEducation() {
	const data = safeRead();
	return data.education || [];
}

function addEducation(item) {
	const data = safeRead();
	const list = data.education || [];
	const newItem = { course: '', institution: '', period: '', ...(item || {}) };
	list.push(newItem);
	data.education = list;
	write(data);
	return newItem;
}

function updateEducation(index, partial) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.education) || idx < 0 || idx >= data.education.length) return null;
	data.education[idx] = { ...data.education[idx], ...(partial || {}) };
	write(data);
	return data.education[idx];
}

function deleteEducation(index) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.education) || idx < 0 || idx >= data.education.length) return false;
	data.education.splice(idx, 1);
	write(data);
	return true;
}

// ===== Certifications =====
function getCertifications() {
	const data = safeRead();
	return data.certifications || [];
}

function addCertification(item) {
	const data = safeRead();
	const list = data.certifications || [];
	const newItem = { name: '', ...(item || {}) };
	list.push(newItem);
	data.certifications = list;
	write(data);
	return newItem;
}

function updateCertification(index, partial) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.certifications) || idx < 0 || idx >= data.certifications.length) return null;
	data.certifications[idx] = { ...data.certifications[idx], ...(partial || {}) };
	write(data);
	return data.certifications[idx];
}

function deleteCertification(index) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.certifications) || idx < 0 || idx >= data.certifications.length) return false;
	data.certifications.splice(idx, 1);
	write(data);
	return true;
}

// ===== Technical Skills =====
function getTechnicalSkills() {
	const data = safeRead();
	return data.technicalSkills || [];
}

function setTechnicalSkills(list) {
	const data = safeRead();
	data.technicalSkills = Array.isArray(list) ? list.map(String) : [];
	write(data);
	return data.technicalSkills;
}

function addTechnicalSkill(skill) {
	const data = safeRead();
	const list = data.technicalSkills || [];
	if (skill != null) list.push(String(skill));
	data.technicalSkills = list;
	write(data);
	return data.technicalSkills;
}

function deleteTechnicalSkill(index) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.technicalSkills) || idx < 0 || idx >= data.technicalSkills.length) return false;
	data.technicalSkills.splice(idx, 1);
	write(data);
	return true;
}

// ===== Soft Skills =====
function getSoftSkills() {
	const data = safeRead();
	return data.softSkills || [];
}

function setSoftSkills(list) {
	const data = safeRead();
	data.softSkills = Array.isArray(list) ? list.map(String) : [];
	write(data);
	return data.softSkills;
}

function addSoftSkill(skill) {
	const data = safeRead();
	const list = data.softSkills || [];
	if (skill != null) list.push(String(skill));
	data.softSkills = list;
	write(data);
	return data.softSkills;
}

function deleteSoftSkill(index) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.softSkills) || idx < 0 || idx >= data.softSkills.length) return false;
	data.softSkills.splice(idx, 1);
	write(data);
	return true;
}

// ===== Languages =====
function getLanguages() {
	const data = safeRead();
	return data.languages || [];
}

function setLanguages(list) {
	const data = safeRead();
	data.languages = Array.isArray(list) ? list.map(String) : [];
	write(data);
	return data.languages;
}

function addLanguage(lang) {
	const data = safeRead();
	const list = data.languages || [];
	if (lang != null) list.push(String(lang));
	data.languages = list;
	write(data);
	return data.languages;
}

function deleteLanguage(index) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.languages) || idx < 0 || idx >= data.languages.length) return false;
	data.languages.splice(idx, 1);
	write(data);
	return true;
}

// ===== Social Links =====
function getSocialLinks() {
	const data = safeRead();
	return data.socialLinks || [];
}

function addSocialLink(link) {
	const data = safeRead();
	const list = data.socialLinks || [];
	const newItem = { name: '', href: '', iconClass: '', ...(link || {}) };
	list.push(newItem);
	data.socialLinks = list;
	write(data);
	return newItem;
}

function updateSocialLink(index, partial) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.socialLinks) || idx < 0 || idx >= data.socialLinks.length) return null;
	data.socialLinks[idx] = { ...data.socialLinks[idx], ...(partial || {}) };
	write(data);
	return data.socialLinks[idx];
}

function deleteSocialLink(index) {
	const data = safeRead();
	const idx = parseInt(index);
	if (!Array.isArray(data.socialLinks) || idx < 0 || idx >= data.socialLinks.length) return false;
	data.socialLinks.splice(idx, 1);
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
	// presentation
	getPresentation,
	updatePresentation,
	// education
	getEducation,
	addEducation,
	updateEducation,
	deleteEducation,
	// certifications
	getCertifications,
	addCertification,
	updateCertification,
	deleteCertification,
	// technical skills
	getTechnicalSkills,
	setTechnicalSkills,
	addTechnicalSkill,
	deleteTechnicalSkill,
	// soft skills
	getSoftSkills,
	setSoftSkills,
	addSoftSkill,
	deleteSoftSkill,
	// languages
	getLanguages,
	setLanguages,
	addLanguage,
	deleteLanguage,
	// social links
	getSocialLinks,
	addSocialLink,
	updateSocialLink,
	deleteSocialLink,
};
