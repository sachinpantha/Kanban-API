// const User = require("../models/User.js")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const register = (req, res, next) => {

//     //Taking password from POST request and hashing it
//     bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
//         if (err) {
//             return res.json({
//                 status: 'failed',
//                 response: {
//                     error: err
//                 }
//             })
//         }
//         let user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             password: hashedPass
//         })
//         user.save()
//             .then(user => {
//                 if (user) {
//                     return res.json({
//                         message: 'Successfully added user to database'
//                     })
//                 }
//                 else {
//                     return res.json({
//                         message: 'error adding user to data'
//                     })
//                 }
//             })
//             .catch(error => {
//                 return res.json({
//                     message: 'error'
//                 })
//             })
//     })
//     next()
// }
// module.exports = {
//     register
// }

const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const User = require('../models/User')
exports.register = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        })

        //JSON WEB TOKEN
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}