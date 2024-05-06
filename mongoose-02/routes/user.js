const express = require("express");
const router = express.Router();

const {
  handleGetAllUsers,
  getUserById,
  getUpdateById,
  getDeleteById,
  handleCreateNewUser,
} = require("../controllers/user");

// router.get("/", handleGetAllUsers());
router.route("/").get(handleGetAllUsers).post(()=> {handleCreateNewUser()});

router
  .route("/:id")
  .get(getUserById)
  .patch(getUpdateById)
  .delete(getDeleteById);

// router.post("/", handleCreateNewUser());

module.exports = router;
