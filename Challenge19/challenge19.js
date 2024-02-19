const mongoose = require("mongoose")
const User = require("./userModel")

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log(`MongoDb connection Error: `, err)})

async function addUserWithValidation(userObject){
    try{
        const newUser = new User(userObject)
        await newUser.save()
        console.log("User added successfully!")
    }catch(err){
        if(err.name === "ValidationError"){
            console.log(`Validation Error: ${err.message}`)
        }else{
            console.log(`Error: `, err)
        }
    }
}
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' })
addUserWithValidation({ username: 'john_doe', email: 'john@example.com' })