const Task = require("../models/kanbanmodel")


//View all tasks
const getAllTasks = async (req, res, next) => {
    try {
        await Task.find()
            .then(response => {
                res.status(200).json({
                    status: 'Success',
                    data: {
                        response
                    }
                })
            })
            .catch((err) => {
                res.status(404).json({
                    status: 'Failed',
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
            Priority: req.body.Priority,
            ToDo: req.body.ToDo,
            Ongoing: req.body.Ongoing,
            Completed: req.body.Completed,
            Description: req.body.Description
        })
        if (!(task.ToDo && task.Ongoing == true || task.ToDo && task.Completed == true || task.Ongoing && task.Completed == true)) {
            await task.save()
                .then(response => {
                    res.status(200).json({
                        status: 'Success',
                        data: {
                            message: 'Task added to todo list in database'
                        }
                    })
                })
                .catch((error) => {
                    res.status(400).json({
                        status: 'Failed',
                        data: {
                            message: 'Someting error occured while storing todo to database'
                        }
                    })
                    console.log(error)
                })
        }
        else {
            res.status(400).json({
                status: 'Failed',
                response: {
                    message: 'The states of tasks cannot be identical'
                }
            })
        }

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
            Priority: req.body.Priority,
            ToDo: req.body.ToDo,
            Ongoing: req.body.Ongoing,
            Completed: req.body.Completed,
        }
        if (!(updatedData.ToDo && updatedData.Ongoing || updatedData.Ongoing && updatedData.Completed || updatedData.ToDo && updatedData.Completed)) {
            await Task.findByIdAndUpdate(taskID, { $set: updatedData })
                .then(() => {
                    res.status(200).json({
                        status: 'Success',
                        data: {
                            message: 'State of Task Updated Successfully!'
                        }
                    })
                })
                .catch(error => {
                    res.status(200).json({
                        status: 'Failed',
                        data: {
                            message: 'An error occured while updating state of task'
                        }
                    })
                })
        }
        else {
            res.status(400).json({
                status: 'Failed',
                response: {
                    message: "The updated states of tasks cannot be identical"
                }
            })
        }
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
