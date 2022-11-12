const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema = new Schema({
    Title: {
        type: String,
        required: [true, 'Title of task must be specified'],
    },
    ToDo: {
        type: Boolean,
        required: [true, 'State of task must be specified'],
    },
    Ongoing: {
        type: Boolean,
        required: [true, 'State of task must be specified'],
    },
    Completed: {
        type: Boolean,
        required: [true, 'State of task must be specified'],
    },
}, { timestamps: true })
const Task = mongoose.model('Task', taskSchema)
module.exports = Task