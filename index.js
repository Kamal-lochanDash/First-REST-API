

const express=require("express");
const {connectMongoDb}= require("./connections")
const userRouter=require("./routes/userr")
const app=express();
const port=8000
const {logReqRes}=require("./middlewares")




// connections

connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1')










app.use(express.urlencoded({extended: false}))//we can use this middle ware to parse the incomming request and pushes to the .body


app.use(logReqRes("log.txt"));

app.use((req,res,next)=>{
    console.log("hello from middleWare 2"+"my userName is "+req.myUsername); //we can access the changes in the child middleware
    next();
})


//# routs
app.use("/api/users",userRouter);


app.listen(port,()=>console.log("app started at port 8000"))