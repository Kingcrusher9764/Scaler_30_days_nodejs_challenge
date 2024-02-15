const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

function greetHandler(req,res){
    const name = req.query.name;
    if(name){
        res.send(`Hello, ${name}!`);
    }else{
        res.send(`Hello, Guest!`);
    }
    
}

app.get("/greet", greetHandler);

app.listen(port, ()=>{
    console.log(`Server started at https://localhost:${port} \n`);
})