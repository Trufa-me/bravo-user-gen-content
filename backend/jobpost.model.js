const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let JobPost = new Schema({
	jobpost_description: {
		type: String
	},
	jobpost_author: {
		type: String
	},
	jobpost_status: {
		type: String
	},
	jobpost_skills: {
		type: String
	},
	jobpost_location: {
		type: String
	},
	jobpost_archived: {
		type: Boolean
	}
});
module.exports = mongoose.model('JobPost', JobPost);
