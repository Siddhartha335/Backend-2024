import jwt from "jsonwebtoken"
const secret = "Sid!123!"

const setUser = (user) => {
    const payload = {
        _id:1,
        ...user
    }
    return jwt.sign(payload,secret,{expiresIn:60*60})

}

const getUser = (token) => {
    return jwt.verify(token,secret)
}

export {setUser,getUser}