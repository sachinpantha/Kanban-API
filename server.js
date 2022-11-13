const express = require("express")
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv")
const kanbanroute = require('./routes/kanbanroute')
const authRoute = require("./routes/Auth")
const connectDB = require("./config/db")
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started running in ${process.env.NODE_ENV} mode on port ${PORT}`))
app.use('/api', kanbanroute)
app.use("/api", authRoute)