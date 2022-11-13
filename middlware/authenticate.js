const jwt = require('jsonwebtoken')
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            res.status(401).json({
                status: "Failed",
                response: {
                    message: "Token Expired!"
                }
            })
        }
        else {
            res.json({
                status: 'Failed',
                response: {
                    message: 'Authentication Failed'
                }
            })
        }
    }
}
module.exports = authenticate
