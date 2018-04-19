var express = require('express');
var router 	= express.Router();

var Project = require('../models/project');
var Widget  = require('../models/widget');

// middleware to use for all requests
router.use(function(req, res, next) {
	next();
});

// ------project----------------------------------------------
router.route('/projects')
	.post(function(req, res) {
		var project = new Project();
		project.name = req.body.name;

		project.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Project created!' });
		});
		
	})
	.get(function(req, res) {
		Project.find(function(err, projects) {
			if (err)
				res.send(err);

			res.json(projects);
		});
	});

router.route('/projects/:project_id')
	.get(function(req, res) {
		Project.findById(req.params.project_id, function(err, project) {
			if (err)
				res.send(err);
			res.json(project);
		});
    })
    
	.put(function(req, res) {
		Project.findById(req.params.project_id, function(err, project) {

			if (err)
				res.send(err);

                project.name = req.body.name;
                project.save(function(err) {
                    if (err)
                        res.send(err);
                res.json({ message: 'Project updated!' });
			});

		});
	})

	.delete(function(req, res) {
		Project.remove({
			_id: req.params.project_id
		}, function(err, project) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

//widget
router.route('/widgets')
	.post(function(req, res) {
		var widget		 = new Widget();
		widget.projectId = req.body.projectId;
		widget.name 	 = req.body.name;
		widget.image 	 = req.body.image;

		widget.save(function(err) {
			if (err)
				res.send(err);
				console.log(req);
			res.json({ message: 'Widget created!' });
		});
		
	})
	.get(function(req, res) {
		Widget.find({projectId: req.query.project_id}, function(err, widgets) {
			if (err)
				res.send(err);

			res.json(widgets);
		});
	});

router.route('/widgets/:widget_id')
	.get(function(req, res) {
		Widget.findById(req.params.widget_id, function(err, widget) {
			if (err)
				res.send(err);
			res.json(widget);
		});
    })
    
	.put(function(req, res) {
		Widget.findById(req.params.widget_id, function(err, widget) {

			if (err)
				res.send(err);

			widget.name 	 = req.body.name;
			widget.projectId = req.body.projectId;
			widget.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Widget updated!' });
			});

		});
	})

	.delete(function(req, res) {
		Widget.remove({
			_id: req.params.widget_id
		}, function(err, widget) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;
