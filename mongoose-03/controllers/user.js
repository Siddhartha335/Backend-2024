const mongoose = require("mongoose")
const userSchema = require("../models/user")

//Models of an Database
const User = mongoose.model("user", userSchema);

const handleGetAllUsers = async (req,res) => {
    res.setHeader("X-MyName", "Siddhartha"); //custom headers  always add x- to custom headers
    let result = await User.find();
    res.json(result)
}

const handleGetUserById = async (req,res) => {
    let user = await User.findById(req.params.id)
    res.json(user);
}

const handleUpdateUserById = async (req, res) => {
    let {firstName,email} = req.body;
    let updatedUser = await User.findByIdAndUpdate(req.params.id,{firstName:firstName,email:email})
    // console.log(updatedUser);
    res.json(updatedUser)
  }

const handleDeleteUserById = async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({msg:"Succesfully deleted!"})
  }

const handleLoginTheUser = async (req, res) => {
    let {firstName,lastName,email,gender,jobTitle} = await req.body;
  //   console.log(body);
  let result = await User.create({firstName:firstName,lastName:lastName,email:email,gender:gender,jobTitle:jobTitle})
  res.json(result)
  }

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleLoginTheUser
}