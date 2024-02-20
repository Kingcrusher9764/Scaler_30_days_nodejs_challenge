const express = require("express")
const mongoose = require("mongoose")
const User = require("./userModel")

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log(`MongoDb connection Error: `, err)})

const app = express()
const port = 3000

app.get("/average-age", async (req, res)=>{
    try{
        const result = await User.aggregate([{
            "$group":{
                "_id": null,
                "averageAge": {"$avg": "$age"}
            }
        }])
        res.json({message: "Success",result: result})
    }catch(err){
        console.log("Error: ",err)
        res.json({message: "Something went wrong"})
    }
})

app.listen(port, ()=>{
    console.log(`Server started at https://localhost:${port}`)
})