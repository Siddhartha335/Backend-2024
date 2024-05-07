const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleLoginTheUser,
} = require("../controllers/user");

const router = express.Router();

//   //It is used to directly render the HTML
//   router.get("/users", async (req, res) => {
//     let users = await User.find();
//     const html = `<ul>
//         ${users.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>`;
//     res.send(html);
//   });

//Route Chaining

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

//Route Chaining og get and post
router.route("/").get(handleGetAllUsers).post( handleLoginTheUser);

module.exports = router;
