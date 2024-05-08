const User = require("../models/user");

async function handleUserSignUp(req,res) {
    const {name,email,password} = req.body;
    await User.create({
        name:name,
        email:email,
        password:password
    })
    res.render("home")
}

module.exports = {
    handleUserSignUp
}