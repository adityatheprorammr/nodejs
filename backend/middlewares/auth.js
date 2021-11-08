const User = require('../models/user')

const jwt = require("jsonwebtoken");

const catchAsyncError = require("./catchAsyncErrors");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                Error(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}