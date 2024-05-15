const jwt = require("jsonwebtoken")

const secret = "Siddhartha@123$"

const createTokenForUser = (user) => {
    return jwt.sign({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profileImageURL: user.profileImageURL,
        role:user.role
    },secret)
}

const validateToken = (token) => {
    if(!token) return null
    return jwt.verify(token,secret)
}

module.exports = {
    createTokenForUser,
    validateToken
}