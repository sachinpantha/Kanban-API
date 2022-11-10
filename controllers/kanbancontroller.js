const Task = require("../models/kanbanmodel")


//View all tasks
const getAllTasks = async (req, res, next) => {
    try {
        await Task.find()
            .then(response => {
                res.status(200).json({
                    status: 'success',
                    data: {
                        response
                    }
                })
            })
            .catch((err) => {
                res.status(404).json({
                    status: 'fail',
                    data: {
                        message: 'No any tasks found',
                        errorMessage: `${err}`
                    }
                })
            })
    }
    catch (err) {
        res.status(400).json({
            status: 'Failed getting all tasks',
            message: err,
        });
    }
    next()
}

//Adding Tasks to database
const addTask = async (req, res, next) => {
    try {
        let task = new Task({
            Title: req.body.Title,
            ToDo: req.body.ToDo,
            Ongoing: req.body.Ongoing,
            Completed: req.body.Completed,
            Description: req.body.Description
        })
        await task.save()
            .then(response => {
                res.json({
                    status: 'success',
                    data: {
                        message: 'Task added to todo list in database'
                    }
                })
            })
            .catch((error) => {
                res.json({
                    status: 'failed',
                    data: {
                        message: 'Someting error occured while storing todo to database'
                    }
                })
                console.log(error)
            })
    }
    catch (err) {
        res.status(400).json({
            status: 'An unexpected error occured adding tasks to database',
            message: err,
        });
    }
    next()
}

//Updating the state of task using taskID

const updateTask = async (req, res, next) => {
    try {
        const taskID = req.body.taskID
        const updatedData = {
            Title: req.body.Title,
            ToDo: req.body.ToDo,
            Ongoing: req.body.Ongoing,
            Completed: req.body.Completed,
        }
        await Task.findByIdAndUpdate(taskID, { $set: updatedData })
            .then(() => {
                res.json({
                    status: 'success',
                    data: {
                        message: 'State of Task Updated Successfully!'
                    }
                })
            })
            .catch(error => {
                res.json({
                    status: 'failed',
                    data: {
                        message: 'An error occured while updating state of task'
                    }
                })
            })
    }
    catch (err) {
        res.status(400).json({
            status: 'An unexpected error occurred while updating task in database',
            message: err,
        });
    }
    next()
}

module.exports = {
    getAllTasks, addTask, updateTask
}
