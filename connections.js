const mongoose=require("mongoose");


async function connectMongoDb(url) {
return mongoose.connect(url)
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log("mongo error",err));
    
}

module.exports={
    connectMongoDb,
}

// 'mongodb://127.0.0.1:27017/youtube-app-1'