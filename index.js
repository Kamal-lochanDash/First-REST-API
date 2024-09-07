const express= require("express");
const users= require("./MOCK_DATA.json");
const fs=require("fs");
const { error } = require("console");

const app=express();
const port=8000


app.get("/api/users",(req,res)=>{
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
    const body=req.query;
    users.push({id: users.length+1,...body,})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(error,data)=>{
        console.log("Body",body)
        return res.json({status:"Success",id:users.length})
    })

   
})


app.route("/api/users/:id")

.get((req,res)=>{

    const id=Number(req.params.id)
   
    const user=users.find((user)=>user.id===id);
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