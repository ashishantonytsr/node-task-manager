const Task = require("../models/Task")

const printLog = (req)=>{
	if (Object.entries(req.body).length != 0)
		console.log(req.url, req.method, req.body);
	console.log(req.url, req.method);
}

// get
const getAllTasks = async (req, res)=>{
	printLog(req)
	try {
		const allTasks = await Task.find({})
		res.status(200).json({"tasks" : allTasks})
	} catch (error) {
		res.status(500).json({msg: error})
	}
}
// post
const createTask = async (req, res)=>{
	printLog(req)
	try {
		const task = await Task.create(req.body)
		return res.status(201).json({task})
	} catch (error) {
		res.status(500).json({"success": false, "error": error.name, "message": error.message})
	}
}
// get one task
const getTask = async (req, res)=>{
	printLog(req)
	try {
		const {id: taskID} = req.params
		const task = await Task.findOne({"_id": taskID}).exec()
		if (!task){
			return res.status(404).json({"success": false, "msg": `No task with id ${taskID}`})
		}
		res.status(200).json({task})
	} catch (error) {
		res.status(500).json({msg: error})
	}
}
// put
const updateTask = async (req, res)=>{
	printLog(req)
	try {
		const {id :taskID} = req.params
		const task = await Task.findOneAndUpdate({"_id": taskID},req.body,{
			new: true,
			runValidators: true
		})
		if (!req.body.name)
			return res.status(400).json({"success": false, "msg": "Please provide credentials"})
		else if (!task)
			return res.status(404).json({"success": false, "msg": `No task with id ${taskID}`})
		res.status(200).json({id: taskID, data: req.body})
	} catch (error) {
		res.status(500).json({msg: error})	
	}
}
// delete
const deleteTask = async (req, res)=>{
	printLog(req)
	try {
		const taskID = req.params.id
		const task = await Task.findOneAndDelete({_id : taskID}).exec()
		if (!task)
			return res.status(404).json({"success": false, "msg": `No task with id ${taskID}`})
		res.status(200).json({"success": true, "deleted task" : task})
	} catch (error) {
		res.status(500).json({msg: error})
	}
}

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask
	}