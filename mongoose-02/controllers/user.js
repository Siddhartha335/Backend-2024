const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const allDBUsers = await User.find();
  res.json(allDBUsers);
};

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
  }

const getUpdateById = async (req, res) => {
    let { email, job_title } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
      email: email,
      jobTitle: job_title,
    });
    // user = {...user,email,job_title};
    // res.json(user);
    res.send("<h1>Sucessfully patched!</h1>");
  }

const getDeleteById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("<h2>Succesfully deleted!</h2>");
  }

const handleCreateNewUser = async (req, res) => {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email || 
      !body.gender ||
      !body.job_title
    ) {
      res.status(400).json({ msg: "All fields are required!" });
    }
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });
    console.log(result);
    res.status(201).json({ msg: "Succesfull post request" });
  }


module.exports = {
    handleGetAllUsers,
    getUserById,
    getUpdateById,
    getDeleteById,
    handleCreateNewUser
}