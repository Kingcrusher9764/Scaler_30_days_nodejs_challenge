const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

async function connectToMongoDB(){
    try{
        url = "mongodb://127.0.0.1:27017/mydatabase";
        await mongoose.connect(url);
    }catch (err){
        console.log("Error in connecting database: ", err);
    }
}
connectToMongoDB();

const db = mongoose.connection;
db.on('error', (err)=>{
    console.log('MongoDB connection error: ', err);
})
db.once('open', ()=>{
    console.log("Connected to MongoDB");
})

app.get("/", (req, res)=>{
    res.send("Scaler challenge 16 completed!");
})
app.listen(port, ()=>{
    console.log(`Server started at https://localhost:${port}`);
})