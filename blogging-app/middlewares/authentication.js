const { validateToken } = require("../services/authentication")

const checkForAuthenticationCookie = (cookieName) => {  //generic functions
    return (req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName]

        if(!tokenCookieValue) {
            return next()
        }

        try {
            const user = validateToken(tokenCookieValue)
            req.user = user
        } catch (error) {}

        return next()
    }
}

module.exports = {
    checkForAuthenticationCookie
}