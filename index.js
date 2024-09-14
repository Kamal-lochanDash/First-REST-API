const express= require("express");
const users= require("./MOCK_DATA.json");
const fs=require("fs");
const { error } = require("console");

const app=express();
const port=8000
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
app.get("/api/users",(req,res)=>{
    res.setHeader('x-myName','kamal lochan dash')
    console.log(req.headers);
   return res.json(users);
})

app.get("/users",(req,res)=>{


    const html=`
   <ul>
   ${users.map((users)=>`<li>${users.first_name}</li>`).join(" ")}
   </ul>
    `;

    res.send(html);
})



app.post("/api/users",(req,res)=>{
    //create a new user
   // const body=req.query;

   const body=req.body;

   if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
    return res.status(400).json({msg:"all filelds are required"});
   }
    users.push({id: users.length+1,...body,})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(error,data)=>{
        console.log("Body",body)
        return res.status(201).json({status:"Success",id:users.length})
    })

   
})


app.route("/api/users/:id")

.get((req,res)=>{
    console.log("i am in the get route and my name is "+req.myUsername)
    const id=Number(req.params.id)
   const user=users.find((user)=>user.id===id);

   if(!user){
    return res.status(404).json({msg: "User not found"})
   }
    res.json(user)
   
   
})

.patch((req,res)=>{
    //edit the user with id
    return res.json({status:"pending"})
})

.post((req,res)=>{
    //delete the user with id
    return res.json({status:"pending"})
})
app.listen(port,()=>console.log("app started at port 8000"))