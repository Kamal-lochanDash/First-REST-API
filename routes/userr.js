const express= require("express");

const router=express.Router();

const {handelGetAllUsers,handelGetUserById,handelUpdateUserbyId, handelDeleteUserbyId, handelCreateNewUser}=require("../controllers/user")




router.route("/")
.get(handelGetAllUsers)
.post(handelCreateNewUser)





router.route("/:id")

.get(handelGetUserById)

.patch(handelUpdateUserbyId)

.delete(handelDeleteUserbyId)

module.exports=router;