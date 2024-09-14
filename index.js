const express= require("express");

const mongoose= require("mongoose");
const fs=require("fs");
const { error } = require("console");
const { type } = require("os");

const app=express();
const port=8000


//connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log("mongo error",err));

//Schema
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
       required:true
    },

    lastName:{
        type:String,
       //required:false //--> if we do not add default is false.
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    jobTitle:{
        type:String,

    },
    gender:{
        type:String,
    },


},{timestamps:true});

const User=mongoose.model('user',userSchema);







app.use(express.urlencoded({extended: false}))//we can use this middle ware to parse the incomming request and pushes to the .body
app.use((req,res,next)=>{
    //this is a middleware
    //next is the referance to the next middleware in the whole process
    //for urlencoded the next refers to this middle ware
    //this middleware next refers to the routs --> but for that we need to call the next function;
    console.log("hello from middleawre 1")
    //!Changing properties of the request
    req.myUsername="KamalLochanDash";
    fs.appendFile('log.txt',`${Date.now()}: ${req.method} : ${req.path}\n`,(err,data)=>{
        next();
    })
   
})

app.use((req,res,next)=>{
    console.log("hello from middleWare 2"+"my userName is "+req.myUsername); //we can access the changes in the child middleware
    next();
})


//# routs
app.get("/api/users",async (req,res)=>{
    const allDbUsers=await User.find({})
    res.setHeader('x-myName','kamal lochan dash')
   
   return res.json(allDbUsers);
})

app.get("/users",async (req,res)=>{

    const allDbUsers= await User.find({});

    const html=`
   <ul>
   ${allDbUsers.map((users)=>`<li>${users.firstName} - ${users.email}</li>`).join(" ")}
   </ul>
    `;

    res.send(html);
})



app.post("/api/users",async (req,res)=>{
    //create a new user
   // const body=req.query;

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
res.status(201).json({msg:"Success"})
   
})


app.route("/api/users/:id")

.get(async(req,res)=>{
    const id=req.params.id
   const user=await User.findById(id);
    //const id=Number(req.params.id)
   //const user=users.find((user)=>user.id===id);

   if(!user){
    return res.status(404).json({msg: "User not found"})
   }
    res.json(user)
   
   
})

.patch(async(req,res)=>{
    //edit the user with id
    await User.findByIdAndUpdate(req.params.id,{lastName:"hogback"})
    return res.status(202).json({status:"success"})
})

.delete(async(req,res)=>{
    //delete the user with id
    await User.findByIdAndDelete(req.params.id)
    return res.status(202).json({status:"Deleted"})
})
app.listen(port,()=>console.log("app started at port 8000"))