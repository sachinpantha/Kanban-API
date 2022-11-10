const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const kanbanroute = require('./routes/kanbanroute')
const dotenv = require("dotenv");
const { config } = require("nodemon");
dotenv.config()
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', (err) => {
    console.log('an error occured')
})
db.on('open', () => {
    console.log('database conection establised')
})
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on ${process.env.NODE_ENV} mode and is running on port ${PORT}`)
})
app.use('/api/task', kanbanroute)