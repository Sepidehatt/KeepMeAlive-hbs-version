const router = require('express').Router();
const axios = require('axios');
const Project = require('../models/Project.model');

router.get('/', (req, res) => {
	Project.find()
		.then(projects => {
			res.render('projects/projects', { projects });
		})
		.catch(err => {
			console.log('error getting project on DB', err);
			next(err);
		});
});

router.get('/add-project', (req, res) => {
	res.render('projects/add-project');
});

router.post('/add-project', (req, res) => {
	const newProject = JSON.parse(JSON.stringify(req.body));

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

module.exports = router;
