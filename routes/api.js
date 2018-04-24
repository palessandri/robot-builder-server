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

		Project.find({})
			   .populate('widgets')
			   .exec(function(err, projects) {
				    if (err)
					   res.send(err);
					res.json(projects);
			   });
	});

router.route('/projects/:project_id')
	.get(function(req, res) {
		Project.findById(req.params.project_id)
			   .populate('widgets')
			   .exec(function(err, project) {
				    if (err)
					   res.send(err);
					res.json(project);
			   });
    })
    
	.put(function(req, res) {
		Project.findById(req.params.project_id, function(err, project) {

			if (err)
				res.send(err);

			project.name = req.body.name || project.name;

			if (req.body.widget_id) {
				
				Widget.findById(req.body.widget_id, function(err, widget) {
					if (err) {
						res.send(err);
					}

					if (req.body.delete_widget) {
						project.widgets.pull(widget);
					} else {
						project.widgets.push(widget);
					}
					
					project.save(function(err) {
						if (err)
							res.send(err);
						res.json({ message: 'Project updated!' });
					});
				})
			} else {
				project.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'Project updated!' });
				});
			}
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
		var widget = new Widget();
		widget.name 	  = req.body.name;
		widget.imageURL   = req.body.imageURL;
		widget.paramCount = req.body.paramCount;

		widget.save(function(err) {
			if (err)
				res.send(err);
				console.log(req);
			res.json({ message: 'Widget created!' });
		});
		
	})
	.get(function(req, res) {
		Widget.find(function(err, widgets) {
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

			widget.name 	  = req.body.name;
			widget.parameters = req.body.parameters;
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
