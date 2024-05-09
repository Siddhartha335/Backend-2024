const User = require("../models/user")
const {v4: uuidv4} = require("uuid")
const {setUser} = require("../services/auth");

const handleUserSignUp = async(req,res)=> {
    const {name,email,password} = req.body;
    await User.create({name,email,password})
    res.redirect("/")
}

const handleUserLogin = async(req,res)=> {
    const {email,password} = req.body;
    const user = await User.findOne({email,password})
    if(!user) return res.render("login",{error:"Invalid username or password!"})
    const token = setUser(user)
    res.cookie("uid",token)
    res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}