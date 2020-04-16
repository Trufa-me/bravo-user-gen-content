const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

let JobPost = require('./jobpost.model');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/jobposts', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
	console.log("MongoDB database connection established successfully");
})
app.listen(PORT, function() {
	console.log("Server is running on Port: " + PORT);
});

// Creating Endpoints to create, read, update, delete JobPosts
const jobPostRoutes = express.Router();
app.use('/jobpost', jobPostRoutes);


jobPostRoutes.route('/').get(function(req, res) {
	JobPost.find(function(err, jobpost) {
		if (err) {
			console.log(err);
		} else {
			res.json(jobpost);
		}
	});
});


jobPostRoutes.route('/:id').get(function(req, res) {
	let id = req.params.id;
	JobPost.findById(id, function(err, jobpost) {
		res.json(jobpost);
	});
});


jobPostRoutes.route('/add').post(function(req, res) {
	let jobpost = new JobPost(req.body);
	console.log(req.body);

	jobpost.save()
		.then(jobpost => {
			res.status(200).json({'jobpost': 'Success', id: jobpost._id});
		})
		.catch(err => {
			res.status(400).send('adding new jobpost failed');
		});
});


jobPostRoutes.route('/update/:id').post(function(req, res) {
	JobPost.findById(req.params.id, function(err, jobpost) {
		if (!jobpost)
			res.status(404).send("data is not found");
		else
			jobpost.jobpost_description = req.body.jobpost_description;
		jobpost.jobpost_author = req.body.jobpost_author;
		jobpost.jobpost_status = req.body.jobpost_status;
		jobpost.jobpost_skills = req.body.jobpost_skills;
		jobpost.jobpost_location = req.body.jobpost_location;
		jobpost.jobpost_archived = req.body.jobpost_archived;
		jobpost.save().then(jobpost => {
			res.json('Jobpost updated!');
		})
			.catch(err => {
				res.status(400).send("Update not possible");
			});
	});
});
