const router = require('express').Router();
const axios = require('axios');
const isLoggedIn = require('../middleware/isLoggedIn');
const Project = require('../models/Project.model');
const checkOwnership = require('../utils/checkOwnership');

router.get('/', (req, res) => {
	Project.find()
		.then(projects => res.render('projects/projects', { projects }))
		.catch(err => {
			console.log('error getting project on DB', err);
			next(err);
		});
});

router.get('/add-project', isLoggedIn, (req, res) => {
	res.render('projects/add-project');
});

router.post('/add-project', isLoggedIn, (req, res) => {
	const newProject = JSON.parse(JSON.stringify(req.body));
	const id = req.session.user._id;

	newProject.owner = id;

	Project.create(newProject)
		.then(() => res.redirect('/'))
		.catch(err => {
			console.log('error creating Project on DB', err);
			next(err);
		});
});

router.get('/keep-them-alive', (req, res, next) => {
	Project.find()
		.then(projects => {
			projects.forEach(project => {
				axios.get(project.endPointsLink).then(response => {
					console.log(response.data);
				});
			});
		})
		.then(() => {
			res.render('projects/projects-alive');
		})
		.catch(err => {
			console.log('error => ', err);
			next(err);
		});
});

router.get('/:projectId/edit', isLoggedIn, (req, res, next) => {
	const { projectId } = req.params;

	const loggedId = req.session.user._id

	Project.findById(projectId)
		.then(project => {
			checkOwnership(loggedId, project, "You aren't allowed to update others projects")
			res.render('projects/edit-project', project);
		})
		.catch(err => {
			console.log('Error trying to get info to update...', err);
			next(err);
		});
});

router.post('/:projectId/edit', isLoggedIn, (req, res, next) => {
	const { projectId } = req.params

	const updatedInfo = JSON.parse(JSON.stringify(req.body))

	console.log(updatedInfo)

	projectId.findByIdAndUpdate()
})

module.exports = router;
