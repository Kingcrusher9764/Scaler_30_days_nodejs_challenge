const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const port = 3000
const JWT_KEY = "secret-key"
app.use(express.json())
const authenticateAndAuthorize = (req, res, next)=>{
    const token = req.headers.authorization
    if(!token) return res.status(401).send("Your not authenticated!")
    try{
        const decoded = jwt.verify(token, JWT_KEY)
        req.user = decoded
        const {role} = decoded
        if(role!=="admin"){
            return res.status(403).json({message: "Your not admin!"})
        }
        next()
    }catch(err){
        return res.status(401).json({message: "Invalid Token!"})
    }
}
const token = jwt.sign({
    id: 1, username: "user1", password: "pass", role: "admin"
}, JWT_KEY)
console.log("The token is : " , token)
app.get("/", authenticateAndAuthorize, (req, res)=>{
    res.json({message:"Welcome to Admin page!", user: req.user})
})
app.listen(port, ()=>{
    console.log(`Server started at ${port}`)
})