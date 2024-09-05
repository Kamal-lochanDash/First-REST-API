const express= require("express");
const users= require("./MOCK_DATA.json");

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



app.post("api/users/",(req,res)=>{
    //create a new user
    return res.json({status:"pending"})
})


app.route("/api/users/:id")

.get((req,res)=>{

    const id=Number(req.params.id)
    if(id<=1000){
    const user=users.find((user)=>user.id===id);
    res.json(user)
    }else{
        const html=`<h1>Hello hello mother fucker</h1>`
        res.send(html);
    }
   
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