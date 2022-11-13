//THIS UPPER COMMENTED CODE IS NOT WORKING BUT INCASE IF I FIX THIS WILL BE BETTER

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
const register = async (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (!err) {
                var newUser = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashedPassword
                })
                return await res.status(201).json({
                    status: 'success',
                    data: {
                        user: newUser,
                    }
                })
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
    next()
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, { expiresIn: '30m' })
                        let refreshToken = jwt.sign({ name: user.name }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '48h' })
                        res.json({
                            message: 'Login Successfull!!',
                            token,
                            refreshToken
                        })
                    }
                    else {
                        res.json({
                            message: 'Password incorrect!'
                        })
                    }
                })
            }
            else {
                res.json({
                    message: 'No user found'
                })
            }
        })
}

module.exports = {
    register,
    login,
}