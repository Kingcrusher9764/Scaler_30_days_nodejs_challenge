const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
const db = mongoose.connection;
db.on('error', (err)=>{
    console.log('MongoDB connection error: ', err);
})
db.once('open', ()=>{
    console.log("Connected to MongoDB");
})
const UserSchema = new mongoose.Schema({
    Username: String,
    Email: String,
})
const User = mongoose.model("Users", UserSchema);
async function addUserToDatabase(user){
    try{
        const username = user.username;
        const email = user.email;
        const newUser = User({
            Username: username,
            Email: email,
        })
        await newUser.save()
        .then((res)=>{console.log("User added to database");})
        .catch((err)=>{console.log(err);})
    }catch(err){
        console.log(err);
    }
}
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });