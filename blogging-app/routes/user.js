const express = require("express")
const User = require("../models/user")
const Blog = require("../models/blog")

const router = express.Router();

router.get("/",async (req,res)=> {
    const allBlogs = await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})

router.get("/signin",(req,res)=> {
    res.render("signin")
})

router.get("/signup",(req,res)=> {
    res.render("signup")
})

router.post("/signin",async(req,res)=> {
    const {email,password} =req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password)

        res.cookie('token',token).redirect("/")
        
    } catch (error) {
        res.render("signin",{
            error:"Incorrect email or password!"
        })
    }
})

router.post("/signup",async(req,res)=> {
    const {fullName,email,password} = req.body;
    await User.create({
        fullName:fullName,
        email:email,
        password:password
    })
    res.redirect("/signin")
})

router.get("/logout",(req,res)=> {
    res.clearCookie('token').redirect("/")
})

module.exports = router