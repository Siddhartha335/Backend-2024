//Stateful Authentication

// const sessionIdToUserMap = new Map();

// const setUser = (id,user) => {
//     return sessionIdToUserMap.set(id,user)
// }

// const getUser = (id) => {
//     return sessionIdToUserMap.get(id)
// }

// module.exports = {
//     setUser,
//     getUser
// }

//Stateless Authentication

const jwt = require("jsonwebtoken")
const secret = "Sid@123$"

const setUser = (user) => {
    return jwt.sign({
        _id:user._id,
        email:user.email
    },secret)
}

const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }

};

module.exports = {
    setUser,
    getUser
}
