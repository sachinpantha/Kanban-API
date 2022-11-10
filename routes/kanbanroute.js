const express = require('express');
const router = express.Router()
const kanbancontroller = require('../controllers/kanbancontroller.js')

//Route to get all tasks in database
router.get('/', kanbancontroller.getAllTasks)

//Route to store task in database
router.post('/addtask', kanbancontroller.addTask)

//Route to update task in database
router.post('/updatetask', kanbancontroller.updateTask)


module.exports = router