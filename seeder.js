const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/User")
const connectDB = require('./config/db.js')
dotenv.config()

connectDB()
const destroyData = async () => {
    try {
        await User.deleteMany()
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