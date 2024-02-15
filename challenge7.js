const express = require("express");
function requestLoggerMiddleware(req, res, next){
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    console.log(` ${timestamp} - ${method} request recieved `);
    next();
}
app = express();
app.use(requestLoggerMiddleware);
port = process.env.PORT || 8080;
app.get("/", (req, res)=>{
    res.send(`Welcome!`);
})
app.listen(port, ()=>{
    console.log(`Server running at https://localhost:${port}`);
})

