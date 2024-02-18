const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
const db = mongoose.connection
db.on("error", (err)=>{
    console.log("MongoDB Connection Error: ", err)
})
db.once("open", ()=>{
    console.log("Connected to MongoDB")
})

const UserSchema = new mongoose.Schema({
    Username: String,
    Email: String,
})
const User = mongoose.model("Users", UserSchema);

app.get("/users", async (req, res)=>{
    try{
        const userData = await User.find();
        res.json({UserData: userData});
    }catch(err){
        console.log("Error in fetching users data: ", err);
    }
})

app.listen(port, ()=>{
    console.log(`Server started at https://localhost:${port}`)
})