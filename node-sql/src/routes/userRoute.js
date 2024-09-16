import express from "express"
import { addUser,getAllUser,getSpecificUser,updateUser,deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/add",addUser)


router.get('/',getAllUser)

router.get('/:id',getSpecificUser)

router.put('/update/:id',updateUser)

router.delete('/delete/:id',deleteUser)

export default router;