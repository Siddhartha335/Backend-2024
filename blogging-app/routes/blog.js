const express = require("express")
const Blog = require("../models/blog")
const Comment = require("../models/comment")
const multer  = require('multer')
const path = require("node:path")

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
     const filename = `${Date.now()}-${file.originalname}`
     cb(null,filename)
    }
  })
  
const upload = multer({ storage: storage })

router.get("/add",(req,res)=> {
    res.render("addBlog",{
        user:req.user
})
})

router.get("/:id",async(req,res)=> {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comment = await Comment.find({blogId:req.params.id}).populate("createdBy")
  res.render("blog",{
    blog:blog,
    user:req.user,
    comments:comment
  })
})  

router.post("/add",upload.single("coverImageURL"),async(req,res)=> {
    // console.log(req.body)
    // console.log(req.file);
    const {title,body} = req.body;
    const blog = await Blog.create({
        title:title,
        body:body,
        createdBy:req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    res.redirect(`/blog/${blog._id}`)
})

router.post("/comment/:blogId",async(req,res)=> {
  const {content} = req.body
  await Comment.create({
    content:content,
    blogId:req.params.blogId,
    createdBy:req.user._id
  })
  res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router