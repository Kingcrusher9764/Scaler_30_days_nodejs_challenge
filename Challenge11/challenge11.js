const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()
const app = express();
const port = process.env.port || 3000;
const secret_key = process.env.secret_key;
const token = jwt.sign({id: 1}, secret_key)
console.log(`The generated token is: ${token}`)
function authenticationMddleware(req, res, next){
    const token = req.headers.authorization;
    const secret_key = process.env.secret_key;
    if(!token){
        return res.status(401).json({error:"No token provided"});
    }
    jwt.verify(token, secret_key, (err, decoded)=>{
        if(err){
            return res.status(401).json({error: "Invalid Token"});
        }
        res.user = decoded;
        next();
    })
}
app.get("/protected", authenticationMddleware, (req,res)=>{ res.send("Route is protected"); })
app.listen(port, ()=>{ console.log(`Server running at https://localhost:${port}`) })