const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {
        type: String,
        required: true,
        validate:{
            validator: (value)=>{
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
})
const User = mongoose.model("Userdata", userSchema)
module.exports = User