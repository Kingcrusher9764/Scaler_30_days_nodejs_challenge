const express = require("express");

const app = express();
const port = 3000;

function loggingMiddleware(req, res, next){
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}: ${req.method} ${req.url}`);
    console.log(`Request header: `, req.headers);
    console.log(`Request body: `, req.body );
    next();
}
app.use(loggingMiddleware);

app.get("/", (req,res)=>{
    res.send("Logged in successfully!");
});

app.listen(port, ()=>{
    console.log(`Server started at https://localhost:${port}`);
});