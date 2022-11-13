const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/User")
const Task = require("./models/kanbanmodel")
const connectDB = require('./config/db.js')
dotenv.config()

connectDB()
const destroyData = async () => {
    try {
        await User.deleteMany()
        await Task.deleteMany()
        console.log('Data Destroyed')
        process.exit()
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}
if (process.argv[2] === '-d') {
    destroyData()
}
else {
    console.log('Nothing to import')
}