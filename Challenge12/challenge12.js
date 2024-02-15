const express = require("express");
const rateLimit = require("express-rate-limit");

app = express();
port = process.env.port || 3000;

const limiter = rateLimit({
    max: 2,
    windowMs: 10*1000,
    message: {status: 429, message: "Too Many Requests. The limit is exceeded. Try again later."}
});
app.use(limiter);

app.get("/", (req,res)=>{
    res.status(200).json({ message: "Server is working" });
})

app.listen(port, ()=>{
    console.log(`Server running at https://localhost:${port}`);
})