const User=require("../models/user")


async function handelGetAllUsers(req,res) {
    const allDbUsers=await User.find({})
   return res.json(allDbUsers);
}

async function handelGetUserById(req,res){
   
        const id=req.params.id
       const user=await User.findById(id);
        
       if(!user){
        return res.status(404).json({msg: "User not found"})
       }
       return res.json(user)
    }


    async function handelUpdateUserbyId(req,res) {

        await User.findByIdAndUpdate(req.params.id,{lastName:"hogback"})
        return res.status(202).json({status:"success"})
        
    }


    async function handelDeleteUserbyId(req,res) {

       //delete the user with id
    await User.findByIdAndDelete(req.params.id)
    return res.status(202).json({status:"Deleted"})
        
    }




    async function handelCreateNewUser(req,res) {


   const body=req.body;

   if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    return res.status(400).json({msg:"all filelds are required"});
   }

   const result=await User.create({
    firstName:body.first_name,
    lastName:body.lastName,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title
   })
 console.log("Result",result);
res.status(201).json({msg:"Success",id:result._id})
       
         
     }
 

module.exports={
    handelGetAllUsers,
    handelGetUserById,
    handelUpdateUserbyId,
    handelDeleteUserbyId,
    handelCreateNewUser
}