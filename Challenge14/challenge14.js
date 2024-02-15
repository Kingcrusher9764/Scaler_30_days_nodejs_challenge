const express = require("express");
const cacheMiddleware = require("./cacheMiddleware")

const app = express();
const port = 3000;

app.use(cacheMiddleware(60));

app.get("/", (req, res)=>{
    setTimeout(()=>{
        const data = "This is the data";
        res.send(data);
    }, 1000);
})

app.listen(port, ()=>{
    console.log(`Server started at https://localhost:${port}`);
})