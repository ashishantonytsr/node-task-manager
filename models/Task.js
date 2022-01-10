const mongoose = require('mongoose')

// constructor - new
// schema - what type of data : string, array
const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Must provide a task"],
		trim: true,
		maxlength: [40, "Task name cannot exceed 20 charectors"]
	},
	completed: {
		type : Boolean,
		default: false
	}
})

module.exports = mongoose.model('Task', TaskSchema)