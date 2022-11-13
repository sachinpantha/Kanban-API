const express = require('express');
const router = express.Router()
const kanbancontroller = require('../controllers/kanbancontroller.js')
const authenticate = require("../middlware/authenticate")
//Route to get all tasks in database
router.get('/task/', authenticate, kanbancontroller.getAllTasks)

//Route to store task in database
router.post('/task/addtask', authenticate, kanbancontroller.addTask)

//Route to update task in database
router.post('/task/updatetask', authenticate, kanbancontroller.updateTask)


module.exports = router