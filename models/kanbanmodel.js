const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema = new Schema({
    Title: {
        type: String
    },
    State: {
        type: String
    },
    ToDo: {
        type: Boolean
    },
    Ongoing: {
        type: Boolean
    },
    Completed: {
        type: Boolean
    },
}, { timestamps: true })
const Task = mongoose.model('Task', taskSchema)
module.exports = Task